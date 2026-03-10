@echo off
cd /d c:\Users\HP\Desktop\sar-trends-ai
echo Creating GitHub repository...
"C:\Program Files\GitHub CLI\gh.exe" repo create sartrends-ai --public --source=. --push
echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Code pushed to GitHub!
    echo Now go to https://vercel.com to deploy
) else (
    echo Failed. Please run manually:
    echo gh repo create sartrends-ai --public --source=. --push
)
pause

