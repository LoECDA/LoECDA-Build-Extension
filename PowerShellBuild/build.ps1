param (
    [switch]$Lint,
    [switch]$Unit
)


function Test-Module {
    param ($ModuleName)

    if ((Get-Module -ListAvailable $ModuleName)) {
        $tru
        e
    }
    else {
        $false
    }
}

$HasPowerShellGet = Test-Module PowerShellGet
function Assert-Module {
    param ($ModuleName)

    if (-not (Test-Module $ModuleName)) {
        if ($HasPowerShellGet) {
            Install-PackageProvider NuGet -Force -ForceBootstrap -Scope CurrentUser
            Install-Module -Name $ModuleName -Scope CurrentUser -Force -AllowClobber -Repository PSGallery
        }
        else {
            throw "This build agent is missing dependency $ModuleName and PowerShellGet is not available."
        }
    }
}


if ($Lint) {
    Assert-Module PSScriptAnalyzer
    Invoke-ScriptAnalyzer -Path $env:BUILD_REPOSITORY_LOCALPATH -Recurse |
        Where-Object severity -eq \"Warning\" |
        ForEach-Object {
        Write-Output "##vso[task.logissue type=$($_.Severity);sourcepath=$($_.ScriptPath);linenumber=$($_.Line);columnnumber=$($_.Column);]$($_.Message)"
    }
}

if ($Unit) {
    Assert-Module Pester
    Invoke-Pester ./test -EnableExit -Strict -OutputFile test-results.xml -OutputFormat NUnitXml -passthru
}


