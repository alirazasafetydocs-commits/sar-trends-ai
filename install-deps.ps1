# Install dependencies for SAR Trends
Write-Host "Installing 3D dependencies..." -ForegroundColor Cyan

Set-Location "c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site"

npm install three @react-three/fiber @react-three/drei

Write-Host "`nDone! Dependencies installed." -ForegroundColor Green
Write-Host "Now run FIXED_START.bat to start the servers" -ForegroundColor Yellow

Start-Sleep 3
