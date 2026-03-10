# Git Configuration and Deployment Script
Write-Host "Configuring Git..." -ForegroundColor Cyan
git config --global user.email "developer@sartrends.store"
git config --global user.name "SAR Trends Developer"

Write-Host "Committing code..." -ForegroundColor Cyan
git commit -m "Initial commit - SAR Trends AI complete project"

Write-Host "`nGit is configured and code is committed!" -ForegroundColor Green
Write-Host "Next steps to deploy:" -ForegroundColor Yellow
Write-Host "1. Create a GitHub repository"
Write-Host "2. Push code to GitHub: git remote add origin <your-repo-url>"
Write-Host "3. Deploy to Vercel and Render"
Write-Host "`nOr run this script again and I'll help you connect to GitHub!"
pause

