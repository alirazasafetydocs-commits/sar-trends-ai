@echo off
echo Deploying fix to Vercel...
cd /d c:\Users\HP\Desktop\sar-trends-ai
git add -A
git commit -m "Fix Tailwind CSS loading issue"
git push origin main
echo Done!
pause

