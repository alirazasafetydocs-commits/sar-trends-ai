@echo off
echo ============================================
echo SAR Trends AI - Starting All Services
echo ============================================
echo.

REM Check if MongoDB is running
echo [1/4] Checking MongoDB...
sc query MongoDB | findstr STATE
if %errorlevel% neq 0 (
    echo MongoDB is not running. Starting MongoDB...
    start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath C:\data\db
    timeout /t 5 /nobreak >nul
)

echo.
echo [2/4] Starting Backend API (Port 5000)...
start "Backend API" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai && node server.js"

timeout /t 5 /nobreak >nul

echo.
echo [3/4] Starting Marketing Website (Port 3000)...
start "Marketing Website" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo [4/4] Starting AI SaaS Frontend (Port 3001)...
start "AI SaaS Frontend" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai\frontend && set PORT=3001 && npm start"

echo.
echo ============================================
echo All services are starting!
echo ============================================
echo.
echo URLs:
echo - Marketing Website: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - AI SaaS Frontend: http://localhost:3001
echo.
pause
