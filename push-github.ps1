# Push to GitHub - Simple version
Set-Location "c:\Users\HP\Desktop\sar-trends-ai"

# First configure git
git config --global user.email "developer@sartrends.store"
git config --global user.name "SAR Trends Developer"

# Add remote and push
git remote add origin https://github.com/sartrends/sartrends-ai.git 2>$null
git branch -M main
git push -u origin main --force

Write-Host "Done! Code pushed to GitHub." -ForegroundColor Green

