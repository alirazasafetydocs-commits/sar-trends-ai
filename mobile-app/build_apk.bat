@echo off
echo Building SAR Trends AI Mobile App...
cd /d c:\Users\HP\Desktop\sar-trends-ai\mobile-app
"C:\Program Files\nodejs\npx.cmd" expo prebuild --platform android
cd android
"C:\Program Files\nodejs\npx.cmd" gradlew assembleDebug
echo.
echo APK should be at: android\app\build\outputs\apk\debug\app-debug.apk
pause

