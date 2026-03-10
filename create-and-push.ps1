# Create GitHub repo and push code
Set-Location "c:\Users\HP\Desktop\sar-trends-ai"

Write-Host "Creating GitHub repository..." -ForegroundColor Cyan

# Create the repository on GitHub
& "C:\Program Files\GitHub CLI\gh.exe" repo create sartrends-ai --public --source=. --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Repository created and code pushed!" -ForegroundColor Green
    Write-Host "Now go to https://vercel.com to deploy" -ForegroundColor Yellow
} else {
    Write-Host "Failed to create repository. Please create it manually at https://github.com/new" -ForegroundColor Red
}

pause

