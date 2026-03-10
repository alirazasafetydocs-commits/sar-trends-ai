@echo off
echo Opening GitHub login in browser...
"C:\Program Files\GitHub CLI\gh.exe" auth login --web
echo.
echo After logging in, run: GITHUB-PUSH.bat
pause

