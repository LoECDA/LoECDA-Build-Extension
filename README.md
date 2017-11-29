# Build Tasks

## PowerShell Build

Tasks to make linting, testing, and publishing PowerShell modules delightful.

Inputs:

* `actionType` / Action - Build Action to Perform
    * `syntax` / Validate PowerShell Syntax
    * `lint` / Lint with PSScriptAnalyzer
    * `unit` / Run Unit Tests with Pester

Example:

```yaml
queue:
  name: Hosted VS2017

steps:
- task: LoECDA.68377f11-49ef-47cc-8f89-8521c12dc65e.c7f221ba-f39c-47b0-bdf8-aa9ca2a13cdb.PowerShellBuild@0
  displayName: Lint
  inputs:
    actionType: "lint"

- task: LoECDA.68377f11-49ef-47cc-8f89-8521c12dc65e.c7f221ba-f39c-47b0-bdf8-aa9ca2a13cdb.PowerShellBuild@0
  displayName: Unit
  inputs:
    actionType: "unit"

```
