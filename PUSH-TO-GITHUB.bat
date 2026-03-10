@echo off
echo ============================================
echo SAR Trends AI - Push to GitHub
echo ============================================
echo.

REM Check if GitHub CLI is installed
where gh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo GitHub CLI not found in PATH!
    echo Please restart your computer and try again.
    echo Or manually add GitHub CLI to your PATH.
    pause
    exit /b 1
)

echo Step 1: Login to GitHub
gh auth login

echo.
echo Step 2: Create GitHub Repository
gh repo create sartrends-ai --public --source=. --push

echo.
echo ============================================
echo Code pushed to GitHub successfully!
echo ============================================
echo.
echo NEXT STEPS:
echo 1. Go to https://vercel.com
echo 2. Import your GitHub repository
echo 3. Deploy the marketing website
echo.
echo Your project is ready to deploy!
pause

