#Requires -Version 5.1

param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Arguments
)

# Configuration
$DEFAULT_CONF = "etc/Default"
$ConfigFiles = @()
$JvmOptions = @()

# Print command line options
function Show-Usage {
    $scriptName = Split-Path -Leaf $MyInvocation.ScriptName
    Write-Host "Usage: $scriptName [options..] [config-file...]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host " -h|--help: print this usage text"
    Write-Host " -J option: pass option to the JVM"
    Write-Host ""
    Write-Host "Default config: $DEFAULT_CONF"
}

# Warn if admin password is not set
if ([string]::IsNullOrEmpty($env:M2EE_ADMIN_PASS)) {
    Write-Warning "`$M2EE_ADMIN_PASS is not set. Ensure that admin.adminPassword is set in one of the specified config file(s) instead."
} else {
    Write-Warning "`$M2EE_ADMIN_PASS detected in the environment variables."
}

# Parse command line arguments
$i = 0
while ($i -lt $Arguments.Count) {
    $arg = $Arguments[$i]

    switch -Exact ($arg) {
        { $_ -in "-h", "--help" } {
            Show-Usage
            exit 0
        }
        "-J" {
            if ($i + 1 -lt $Arguments.Count) {
                $JvmOptions += $Arguments[$i + 1]
                $i += 2
            } else {
                Write-Error "Option -J requires a value"
                exit 1
            }
        }
        { $_.StartsWith("-") } {
            Write-Error "Unknown option: $arg"
            Write-Host ""
            Show-Usage
            exit 1
        }
        default {
            $ConfigFiles += $arg
            $i++
        }
    }
}

# Resolve paths
$RootPath = (Resolve-Path (Join-Path (Split-Path $MyInvocation.MyCommand.Path) "..")).Path
$MxInstallPath = Join-Path $RootPath "lib"
$DefaultConfPath = Join-Path $RootPath $DEFAULT_CONF
$Config = if ($ConfigFiles.Count -gt 0) { $ConfigFiles } else { @($DefaultConfPath) }

# Set environment variables
$env:ROOT_PATH = $RootPath
$env:MX_INSTALL_PATH = $MxInstallPath

# Function to collect JVM options from configuration files
function Get-JvmOptions {
    param(
        [string]$FilePath
    )

    Write-Information "Processing config file: $FilePath"

    if (-not (Test-Path $FilePath)) {
        Write-Warning "Configuration file not found: $FilePath"
        return
    }

    $content = Get-Content $FilePath -Raw

    # Extract heap size
    if ($content -match '(?m)^\s*jvm\.heap\s*=\s*(.+?)$') {
        $heap = $matches[1].Trim() -replace '\r$'
        if (-not [string]::IsNullOrEmpty($heap)) {
            $JvmOptions += "-Xmx$heap"
            Write-Information "Detected JVM heap size: $heap"
        }
    }

    # Extract JVM parameters
    if ($content -match '(?m)^\s*jvm\.params\s*=\s*"?(.+?)"?\s*$') {
        $params = $matches[1].Trim() -replace '"\s*$' -replace '\r$'
        if (-not [string]::IsNullOrEmpty($params)) {
            $JvmOptions += $params -split '\s+'
            Write-Information "Detected JVM params: $params"
        }
    }

    # Process includes
    [regex]::Matches($content, '^\s*include\s*file\("(.+?)"\)', 'Multiline') | ForEach-Object {
        $includePath = $_.Groups[1].Value
        Write-Information "Including config file: $includePath"
        # Resolve relative path
        if (-not [System.IO.Path]::IsPathRooted($includePath)) {
            $includePath = Join-Path $RootPath $includePath
        }
        Get-JvmOptions -FilePath $includePath
    }
}

# Collect JVM options from all configuration files
foreach ($configFile in $Config) {
    Get-JvmOptions -FilePath $configFile
}

# Prepare final JVM options string
$JvmOptionsString = $JvmOptions -join ' '

# Verify required files exist
$RuntimeJar = Join-Path $MxInstallPath "runtime/launcher/runtimelauncher.jar"
if (-not (Test-Path $RuntimeJar)) {
    Write-Error "Runtime JAR not found: $RuntimeJar"
    exit 1
}

# Start the runtime
try {
    Push-Location $RootPath

    $javaArgs = @(
        "-DMX_LOG_LEVEL=$($env:MX_LOG_LEVEL -or 'INFO')"
        "-Dfile.encoding=UTF-8"
        "-Djava.io.tmpdir=$([System.IO.Path]::GetTempPath())"
        "-Djava.library.path=`"$MxInstallPath\runtime\lib\x64;$RootPath\app\model\lib\userlib`""
    )

    if (-not [string]::IsNullOrEmpty($JvmOptionsString)) {
        $javaArgs += $JvmOptionsString -split '\s+'
    }

    $javaArgs += @(
        "-jar"
        "`"$RuntimeJar`""
        "`"$RootPath\app\.`""
        ($Config -join ' ')
    )

    Write-Information "Starting runtime with arguments: $($javaArgs -join ' ')"
    & java $javaArgs

    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}
catch {
    Write-Error "Failed to start runtime: $_"
    exit 1
}
finally {
    Pop-Location
}
