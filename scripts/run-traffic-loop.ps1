$ErrorActionPreference = "Continue"
Set-Location "C:\Users\kkpet\Desktop\Eulera\repo"

$log = "traffic-loop.log"

while ($true) {
  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss K"
  Add-Content -Path $log -Value "[$stamp] traffic check start"

  try {
    node scripts\check-traffic-signals.mjs *> traffic-check-last.out
    Add-Content -Path $log -Value "[$stamp] traffic check complete"
  } catch {
    Add-Content -Path $log -Value "[$stamp] traffic check failed: $($_.Exception.Message)"
  }

  Start-Sleep -Seconds 1800
}
