@echo off
title SAR Trends - Complete Starter
color 0a
cls

echo.
echo ================================================
echo   SAR TRENDS AI - STARTUP SCRIPT
echo ================================================
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

if not exist "sartrends-ai\server.js" (
    echo [ERROR] Please run this script from the sar-trends-ai folder
    pause
    exit /b 1
)

echo Step 1: Installing dependencies...
echo ----------------------------------
if not exist "sartrends-store-site\node_modules\@react-three" (
    cd /d %CD%\sartrends-store-site
    npm install three @react-three/fiber @react-three/drei
    echo [OK] 3D libraries installed
) else (
    echo [OK] Dependencies already installed
)
echo.

echo Step 2: Starting Backend Server...
echo --------------------------------------
start "SAR Trends Backend" cmd /k "cd /d %CD%\sartrends-ai && node server.js"
echo [Started] Backend on port 5000
echo.

timeout /t 5 /nobreak

echo Step 3: Starting Admin Panel...
echo ----------------------------------
start "SAR Trends Admin" cmd /k "cd /d %CD%\sartrends-ai\admin-panel && set PORT=3001 && npm start"
echo [Started] Admin Panel on port 3001
echo.

timeout /t 5 /nobreak

echo Step 4: Starting Website...
echo --------------------------------
start "SAR Trends Website" cmd /k "cd /d %CD%\sartrends-store-site && npm run dev"
echo [Started] Website on port 3000
echo.

echo.
echo ================================================
echo   ALL SERVICES STARTED!
echo ================================================
echo.
echo Please wait 30-60 seconds for all servers to start...
echo.
echo URLs:
echo   - Website:     http://localhost:3000
echo   - Admin Panel: http://localhost:3001
echo   - Backend:     http://localhost:5000
echo.
echo Admin Login:
echo   Email:    admin@sartrends.store
echo   Password: Admin@123
echo.
echo ================================================
echo.

pause
