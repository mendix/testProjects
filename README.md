# Mendix Test Projects

A collection of test projects regarding to R&D platform supported web widgets. Please find the correct branch name in order to find the corresponding widget's test project.

These projects are being used for e2e tests in [web-widgets repo](https://github.com/mendix/web-widgets). For more information please visit it.

## EmployeeDB_Main

This test project provide data snapshot for e2e. To use snapshots, export `EmployeeDB` module and import it to your test project.
Use `AC_SetupEmployeeDB` or `DS_Employee` microflows to load snapshot.

You can adjust snapshot size by changing `ARG_Snapshot` microflow and selecting one of available snapshots.
