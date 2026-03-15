@echo off
setlocal enabledelayedexpansion

echo ============================================
echo SAR Trends AI - Create PR (Fixed)
echo ============================================
echo.

cd /d "c:\Users\HP\Desktop\sar-trends-ai"

echo [1/6] Checking GitHub CLI...
gh --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: GitHub CLI (gh) not found. Install from https://cli.github.com/
    pause
    exit /b 1
)

echo [2/6] Checking authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Not authenticated. Run: gh auth login
    pause
    exit /b 1
)
echo OK: Authenticated.

echo [3/6] Checking git repo...
git rev-parse --git-dir >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Not a git repo.
    pause
    exit /b 1
)

echo Current branch: % (git branch --show-current)

echo [4/6] Stagging all changes...
git add -A

echo [5/6] Checking for changes...
git diff --staged --quiet
if %ERRORLEVEL% EQU 0 (
    echo No changes to commit. Make some changes first, then run again.
    pause
    exit /b 0
)

echo [6/6] Committing and pushing...
git commit -m "blackboxai/$(git branch --show-current): Fix PR creation error handling"
git push -u origin HEAD

if %ERRORLEVEL% EQU 0 (
    echo [7/7] Creating Pull Request...
    gh pr create --fill --base main
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo SUCCESS! PR created.
        echo View: gh pr view --web
    ) else (
        echo PR creation failed. Check gh pr list
    )
) else (
    echo Push failed. Check git status.
)

pause
