@echo off
echo Packaging Quantum Fortune Teller System...

REM Create release directory
if not exist release mkdir release

REM Package Windows version
echo Packaging Windows version...
powershell Compress-Archive -Path "dist\quantum-fortune-teller-win32-x64\*" -DestinationPath "release\quantum-fortune-teller-windows-x64.zip" -Force
echo Windows version packaging completed!

REM Package Linux version
echo Packaging Linux version...
powershell Compress-Archive -Path "dist\quantum-fortune-teller-linux-x64\*" -DestinationPath "release\quantum-fortune-teller-linux-x64.zip" -Force
echo Linux version packaging completed!

echo Packaging completed!
echo Release files are located in the release directory
pause 