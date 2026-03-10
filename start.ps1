# Start SAR Trends AI Services
Write-Host "Starting SAR Trends AI Services..." -ForegroundColor Cyan

# Start MongoDB
Write-Host "Starting MongoDB..." -ForegroundColor Yellow
Start-Process -FilePath "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" -ArgumentList "--dbpath","C:\data\db" -WindowStyle Hidden
Start-Sleep -Seconds 3

# Start Backend
Write-Host "Starting Backend API on port 5000..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/k","cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai && node server.js" -WindowStyle Normal
Start-Sleep -Seconds 5

# Start Marketing Website
Write-Host "Starting Marketing Website on port 3000..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/k","cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site && npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "Starting AI SaaS Frontend on port 3001..." -ForegroundColor Yellow
$env:PORT = "3001"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k","cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai\frontend && set PORT=3001 && npm start" -WindowStyle Normal

Write-Host ""
Write-Host "All services started!" -ForegroundColor Green
Write-Host "Marketing Website: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "AI SaaS Frontend: http://localhost:3001" -ForegroundColor Cyan
