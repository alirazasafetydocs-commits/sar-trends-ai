@echo off
echo ============================================
echo SAR Trends AI - Starting All Services
echo ============================================
echo.

echo [1/3] Starting MongoDB...
start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Backend API (Port 5000)...
start "Backend API" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai && node server.js"

echo [3/3] Starting Marketing Website (Port 3000)...
start "Marketing Website" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site && npm run dev"

echo.
echo ============================================
echo All services starting...
echo ============================================
echo.
echo Services will be available at:
echo - Marketing Website: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - AI SaaS Frontend: http://localhost:3001
echo.
echo Note: To start AI SaaS Frontend, open a new terminal and run:
echo cd sartrends-ai\frontend && npm start
echo.
pause

