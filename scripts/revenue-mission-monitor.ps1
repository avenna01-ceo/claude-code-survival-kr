$ErrorActionPreference = "Continue"

$repo = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$log = Join-Path $repo "revenue-mission-monitor.log"
$deliverLog = "C:\Users\kkpet\Desktop\Eulera\autodeliver\deliver.log"
$deadline = (Get-Date "2026-07-29T11:50:00+09:00")

Set-Location $repo

while ((Get-Date) -lt $deadline) {
  $stamp = (Get-Date).ToString("s")
  Add-Content -Path $log -Value "[$stamp] monitor cycle start"

  try {
    node scripts\check-traffic-signals.mjs *> traffic-check-last.out
    Add-Content -Path $log -Value "[$stamp] traffic check complete"
  } catch {
    Add-Content -Path $log -Value "[$stamp] traffic check failed: $($_.Exception.Message)"
  }

  try {
    node scripts\submit-indexnow.mjs *> indexnow-last.out
    Add-Content -Path $log -Value "[$stamp] indexnow submit complete"
  } catch {
    Add-Content -Path $log -Value "[$stamp] indexnow submit failed: $($_.Exception.Message)"
  }

  try {
    if (Test-Path $deliverLog) {
      Get-Content -Path $deliverLog -Tail 12 > deliver-last.out
      Add-Content -Path $log -Value "[$stamp] delivery log snapshot complete"
    }
  } catch {
    Add-Content -Path $log -Value "[$stamp] delivery log snapshot failed: $($_.Exception.Message)"
  }

  Add-Content -Path $log -Value "[$stamp] monitor cycle end"
  Start-Sleep -Seconds 1800
}

Add-Content -Path $log -Value "[$((Get-Date).ToString("s"))] monitor deadline reached"
