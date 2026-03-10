@echo off
title SAR Trends AI Launcher
echo Starting MongoDB...
start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
timeout /t 3 /nobreak
echo Starting Backend API...
start "Backend" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai && node server.js"
timeout /t 5 /nobreak
echo Starting Marketing Website...
start "Website" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-store-site && npm run dev"
timeout /t 5 /nobreak
echo Starting Frontend...
start "Frontend" cmd /k "cd /d c:\Users\HP\Desktop\sar-trends-ai\sartrends-ai\frontend && set PORT=3001&& npm start"
echo Done! Check the opened windows for status.
pause
