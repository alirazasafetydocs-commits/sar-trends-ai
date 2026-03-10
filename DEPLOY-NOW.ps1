# SAR Trends AI - Complete Deployment Script
# This script will help you deploy to Vercel and Render

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SAR Trends AI - Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if GitHub CLI is available
$ghPath = "C:\Program Files\GitHub CLI\gh.exe"
if (Test-Path $ghPath) {
    Write-Host "`nGitHub CLI found!" -ForegroundColor Green
    
    # Check auth status
    & $ghPath auth status 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nPlease login to GitHub:" -ForegroundColor Yellow
        & $ghPath auth login
    }
} else {
    Write-Host "`nGitHub CLI not found. Please install it from: https://cli.github.com/" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT STEPS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nSTEP 1: Push to GitHub" -ForegroundColor Green
Write-Host "------------------------"
Write-Host "Run these commands in a new terminal:"
Write-Host "  gh repo create sartrends-ai --public --source=. --push"
Write-Host "  (Or create repo manually at https://github.com/new)"

Write-Host "`nSTEP 2: Deploy Marketing Website & AI Frontend to Vercel" -ForegroundColor Green
Write-Host "--------------------------------------------------------------------"
Write-Host "1. Go to https://vercel.com and sign up"
Write-Host "2. Import your GitHub repository"
Write-Host "3. For Marketing Website:"
Write-Host "   - Framework Preset: Next.js"
Write-Host "   - Root Directory: sartrends-store-site"
Write-Host "4. For AI Frontend:"
Write-Host "   - Create new project"
Write-Host "   - Import sartrends-ai/frontend"
Write-Host "   - Add env: REACT_APP_API_URL=<your-backend-url>"

Write-Host "`nSTEP 3: Deploy Backend to Render" -ForegroundColor Green
Write-Host "----------------------------------------"
Write-Host "1. Go to https://render.com and sign up"
Write-Host "2. Create new Web Service"
Write-Host "3. Connect your GitHub repository (sartrends-ai)"
Write-Host "4. Settings:"
Write-Host "   - Build Command: npm install"
Write-Host "   - Start Command: npm start"
Write-Host "5. Add Environment Variables:"
Write-Host "   - PORT: 5000"
Write-Host "   - MONGODB_URI: <your-mongodb-atlas-connection-string>"
Write-Host "   - JWT_SECRET: <any-random-string>"

Write-Host "`nSTEP 4: Setup MongoDB Atlas (Database)" -ForegroundColor Green
Write-Host "--------------------------------------------"
Write-Host "1. Go to https://www.mongodb.com/atlas"
Write-Host "2. Create free account and cluster"
Write-Host "3. Create database user"
Write-Host "4. Get connection string and add to Render"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "YOUR PROJECT IS READY TO DEPLOY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nLocal Development URLs (already running):"
Write-Host "  - Marketing Website: http://localhost:3000"
Write-Host "  - Backend API: http://localhost:5000"
Write-Host "  - AI Frontend: http://localhost:3001"

Write-Host "`nCode is committed and ready to push!" -ForegroundColor Green
pause

