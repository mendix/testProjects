@echo off
setlocal enabledelayedexpansion

REM Configuration defaults
set "DEFAULT_CONF=etc\Default"
set "CONFIG_FILES="
set "JVM_OPTIONS="

REM Resolve ROOT_PATH (equivalent to realpath)
for %%I in ("%~dp0..") do set "ROOT_PATH=%%~fI"

set "MX_INSTALL_PATH=%ROOT_PATH%\lib"
set "DEFAULT_CONF_PATH=%ROOT_PATH%\%DEFAULT_CONF%"

REM Detect M2EE_ADMIN_PASS status
if defined M2EE_ADMIN_PASS (
    echo M2EE_ADMIN_PASS detected in the environment variables.
) else (
    echo M2EE_ADMIN_PASS is not set. Ensure that admin.adminPassword is set in one of the specified config file^(s^) instead.
    echo.
)

:parse_args
if "%~1"=="" goto :args_done
if "%~1"=="-h" (
    call :print_usage
    exit /b 0
)
if "%~1"=="--help" (
    call :print_usage
    exit /b 0
)
if "%~1"=="-J" (
    set "JVM_OPTIONS=!JVM_OPTIONS! %~2"
    shift
    shift
    goto :parse_args
)
if "%~1:~0,1%"=="-" (
    echo ERROR: Unknown option: %~1
    echo.
    call :print_usage
    exit /b 1
)
set "CONFIG_FILES=!CONFIG_FILES! %~1"
shift
goto :parse_args

:args_done

if defined CONFIG_FILES (
    set "CONFIG=%CONFIG_FILES%"
) else (
    set "CONFIG=%DEFAULT_CONF_PATH%"
)

REM Collect JVM options from all configuration files
for %%F in (%CONFIG%) do (
    call :get_jvm_options "%%F"
)

REM Change to ROOT_PATH and start the runtime
cd /d "%ROOT_PATH%" || (
    echo ERROR: Failed to change directory to %ROOT_PATH%
    exit /b 1
)

REM Start Java application
java ^
    -DMX_LOG_LEVEL=%MX_LOG_LEVEL% ^
    -Dfile.encoding=UTF-8 ^
    -Djava.io.tmpdir="%TEMP%" ^
    -Djava.library.path="%MX_INSTALL_PATH%\runtime\lib\x64;%ROOT_PATH%\app\model\lib\userlib" ^
    %JVM_OPTIONS% ^
    -jar "%MX_INSTALL_PATH%\runtime\launcher\runtimelauncher.jar" ^
    "%ROOT_PATH%\app\." !CONFIG!

exit /b %errorlevel%

REM Print command line options
:print_usage
echo Usage: %~nx0 [options..] [config-file...]
echo.
echo Options:
echo  -h, --help: print this usage text
echo  -J option: pass option to the JVM
echo.
echo Default config: %DEFAULT_CONF%
exit /b 0

REM Function to collect JVM options from a file
:get_jvm_options
set "jvm_options_file=%~f1"
if not exist "!jvm_options_file!" (
    echo WARNING: Config or include file not found: !jvm_options_file!
    exit /b 0
)

REM Extract heap setting (jvm.heap=...)
for /f "usebackq tokens=* delims=" %%A in (`findstr /R "^jvm.heap" "!jvm_options_file!"`) do (
    for /f "tokens=2 delims==" %%B in ("%%A") do (
        set "HEAP=%%B"
        set "HEAP=!HEAP: =!"
        if not "!HEAP!"=="" (
            set "JVM_OPTIONS=-Xmx!HEAP! !JVM_OPTIONS!"
        )
    )
)

REM Extract params setting (jvm.params=...)
for /f "usebackq tokens=* delims=" %%A in (`findstr /R "jvm.params" "!jvm_options_file!"`) do (
    for /f "tokens=2* delims==" %%B in ("%%A") do (
        set "PARAMS=%%B%%C"
        REM Remove leading/trailing spaces
        for /f "tokens=* delims= " %%D in ("!PARAMS!") do set "PARAMS=%%D"
        REM Remove all quotes
        set "PARAMS=!PARAMS:"=!"
        if not "!PARAMS!"=="" (
            set "JVM_OPTIONS=!JVM_OPTIONS! !PARAMS!"
        )
    )
)

REM Process include files recursively
for /f "usebackq tokens=* delims=" %%A in (`findstr /R "^include file" "!jvm_options_file!"`) do (
    for /f "tokens=2 delims=(" %%B in ("%%A") do (
        set "include_path=%%B"
        set "include_path=!include_path:"=!"
        set "include_path=!include_path:)=!"
        set "include_path=!include_path:/=\!"
        call :get_jvm_options %ROOT_PATH%\!include_path!
    )
)
exit /b 0
