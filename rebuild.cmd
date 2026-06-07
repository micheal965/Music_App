@echo off
echo ========================================
echo   MUSICIFY - COMPLETE CLEAN REBUILD
echo ========================================
echo.

echo [1/4] Cleaning Android build...
cd android
call gradlew clean
cd ..
echo ✓ Android cleaned
echo.

echo [2/4] Clearing Metro cache...
echo Starting Metro with reset cache...
echo.
echo ========================================
echo   NEXT STEP:
echo   Open a NEW terminal and run:
echo   yarn android
echo ========================================
echo.

yarn start --reset-cache
