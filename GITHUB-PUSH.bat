@echo off
setlocal enabledelayedexpansion

echo ============================================
echo SAR Trends AI - GitHub Push
echo ============================================
echo.

cd /d c:\Users\HP\Desktop\sar-trends-ai

echo Checking GitHub CLI...
gh --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: GitHub CLI not found!
    echo Please restart your computer and try again.
    pause
    exit /b 1
)

echo GitHub CLI found. Checking authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo You need to login to GitHub first!
    echo.
    echo Please run in a NEW terminal (not this one):
    echo   gh auth login
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo Already authenticated. Creating repository...
gh repo create sartrends-ai --public --source=. --push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo SUCCESS! Code pushed to GitHub!
    echo ============================================
    echo.
    echo NEXT: Deploy to Vercel
    echo 1. Go to https://vercel.com
    echo 2. Sign up with GitHub
    echo 3. Import "sartrends-ai" repo
    echo 4. Deploy!
) else (
    echo.
    echo Failed to push. Please try manually:
    echo   gh repo create sartrends-ai --public --source=. --push
)

pause

