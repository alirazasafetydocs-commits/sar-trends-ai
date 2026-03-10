@echo off
echo ============================================
echo GitHub Login & Push Script
echo ============================================
echo.
echo STEP 1: Login to GitHub
echo -----------------------
echo Run this command and follow the prompts:
echo   gh auth login
echo.
echo Select these options:
echo   - HTTPS: Yes
echo   - GitHub.com: Yes  
echo   - Login with web browser: Yes
echo.
echo STEP 2: Push Code
echo -----------------
echo After logging in, run:
echo   gh repo create sartrends-ai --public --source=. --push
echo.
echo ============================================
echo ALTERNATIVE: Manual Push
echo ============================================
echo If above doesn't work:
echo 1. Go to https://github.com/new
echo 2. Create repo named: sartrends-ai
echo 3. Run these commands:
echo    git remote add origin https://github.com/YOURUSERNAME/sartrends-ai.git
echo    git push -u origin main
echo.
pause

