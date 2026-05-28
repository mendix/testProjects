# Test App

Verify the running Mendix application using playwright-cli.

## Prerequisites

- App must be running: `mxcli docker run -p app.mpr --wait`
- playwright-cli installed (included in devcontainer)

## Quick Start

```bash
# Open browser and take snapshot
playwright-cli open http://localhost:8080
playwright-cli snapshot

# Verify a widget exists
playwright-cli run-code "document.querySelector('.mx-name-widgetName') !== null"

# Take a screenshot
playwright-cli screenshot

# Close when done
playwright-cli close
```

## Login (Security Enabled)

```bash
playwright-cli open http://localhost:8080
playwright-cli run-code "document.querySelector('#usernameInput').value = 'MxAdmin'"
playwright-cli run-code "document.querySelector('#passwordInput').value = 'AdminPassword1!'"
playwright-cli run-code "document.querySelector('#loginButton').click()"
playwright-cli run-code "await new Promise(r => setTimeout(r, 3000))"
playwright-cli state-save mendix-auth
```

## Full Workflow

```bash
# 1. Apply MDL changes
mxcli exec changes.mdl -p app.mpr

# 2. Build, start, and wait for runtime
mxcli docker run -p app.mpr --fresh --wait

# 3. Open browser and verify
playwright-cli open http://localhost:8080
playwright-cli snapshot
# ... interact and verify ...

# 4. Verify data persistence
mxcli oql -p app.mpr --json "SELECT Name FROM MyModule.Customer"

# 5. Close browser
playwright-cli close
```

## CI/CD Scripts

For regression testing, capture commands in shell scripts:

```bash
# Run a test script
bash tests/verify-customers.sh

# Run all test scripts
for f in tests/verify-*.sh; do bash "$f" || exit 1; done
```

## Tips

- Use `.mx-name-*` selectors from your MDL widget names — they are stable
- Use `run-code` with `throw new Error()` for assertions in scripts
- Use `state-save`/`state-load` to persist login across verifications
- Use `mxcli oql` for data assertions (no npm packages needed)
- Use `--headed` flag to see the browser for debugging
- Use `playwright-cli screenshot` to capture visual state
- See skill: test-app for full reference
