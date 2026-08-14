param(
    [Parameter(Mandatory=$true)]
    [string]$Title
)

$wshell = New-Object -ComObject WScript.Shell
$success = $wshell.AppActivate($Title)
if (-not $success) {
    # Try finding process ID
    $p = Get-Process | Where-Object { $_.ProcessName -like "*$Title*" -or $_.MainWindowTitle -like "*$Title*" } | Select-Object -First 1
    if ($p) {
        $success = $wshell.AppActivate($p.Id)
    }
}

if ($success) {
    Write-Host "AppActivated: $Title"
} else {
    Write-Warning "Could not AppActivate: $Title"
}
