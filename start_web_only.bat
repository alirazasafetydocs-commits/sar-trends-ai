@echo off
title SAR Trends AI - Web Only Launcher
echo Starting Backend API (Demo Mode - No MongoDB Required)...
start "Backend" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai && node server.js"
timeout /t 5 /nobreak
echo Starting Marketing Website...
start "Website" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site && npm run dev"
timeout /t 5 /nobreak
echo Starting Frontend...
start "Frontend" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai\frontend && set PORT=3001&& npm start"
echo.
echo ========================
echo All services starting!
echo ========================
echo Marketing Website: http://localhost:3000
echo Backend API: http://localhost:5000
echo AI Frontend: http://localhost:3001
echo ========================
pause

