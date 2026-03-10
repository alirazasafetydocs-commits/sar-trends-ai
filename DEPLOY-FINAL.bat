@echo off
echo ============================================
echo SAR Trends AI - Complete Deployment Guide
echo ============================================
echo.

echo STEP 1: GitHub Authentication
echo -------------------------------
echo 1. Open browser and go to: https://github.com
echo 2. Make sure you're logged in to your GitHub account
echo 3. Go back to this terminal
echo.
echo STEP 2: Create GitHub Repository
echo ---------------------------------
echo Run this command in terminal:
echo   gh repo create sartrends-ai --public --source=. --push
echo.
echo OR go to: https://github.com/new
echo - Repository name: sartrends-ai
echo - Public: Yes
echo - Click "Create Repository"
echo.
echo STEP 3: Deploy to Vercel
echo -------------------------
echo After code is on GitHub:
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Click "Add New..." -> "Project"
echo 4. Select "sartrends-ai" repository
echo 5. For Marketing Website:
echo    - Framework Preset: Next.js
echo    - Root Directory: sartrends-store-site
echo 6. Click "Deploy"
echo.
echo STEP 4: Deploy Backend
echo -----------------------
echo 1. Go to https://render.com
echo 2. Sign up with GitHub
echo 3. Create "Web Service"
echo 4. Connect your GitHub repository
echo 5. Build Command: npm install
echo 6. Start Command: npm start
echo.
echo ============================================
echo GUIDE COMPLETE!
echo ============================================
pause

