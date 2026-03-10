@echo off
echo ============================================
echo SAR Trends AI - COMPLETE DEPLOYMENT
echo ============================================
echo.

echo STEP 1: GitHub Login
echo --------------------
echo A browser window will open for GitHub login.
echo 1. Click "Authorize github"
echo 2. Return to this terminal
echo.
echo Press any key to open GitHub login...
pause >nul

"C:\Program Files\GitHub CLI\gh.exe" auth login --web

echo.
echo STEP 2: Push to GitHub
echo ----------------------
echo Creating repository and pushing code...
"C:\Program Files\GitHub CLI\gh.exe" repo create sartrends-ai --public --source=. --push

if %ERRORLEVEL% EQU 0 goto :success

echo.
echo STEP 2 Alternative: Manual Push
echo -------------------------------
echo If above failed, the repository may already exist.
echo Pushing to existing repository...
git push -u origin main --force

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo FAILED! Please run these commands manually in a new terminal:
    echo   gh auth login --web
    echo   gh repo create sartrends-ai --public --source=. --push
    pause
    exit /b 1
)

:success
echo.
echo ============================================
echo SUCCESS! Code is on GitHub!
echo ============================================
echo.
echo NOW: Deploy to Vercel
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Click "Add New" -^> "Project"
echo 4. Select "sartrends-ai"
echo 5. For settings:
echo    - Framework: Next.js
echo    - Root: sartrends-store-site
echo 6. Click "Deploy"
echo.
echo After deploy, add domain: sartrends.store
echo.
echo Done!
pause

