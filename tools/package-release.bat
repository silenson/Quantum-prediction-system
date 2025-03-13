@echo off
echo Packaging Quantum Fortune Teller System...

REM Create release directory
if not exist release mkdir release

REM Check Windows version directory
if exist "dist\quantum-fortune-teller-win32-x64" (
  echo Packaging Windows version...
  powershell Compress-Archive -Path "dist\quantum-fortune-teller-win32-x64\*" -DestinationPath "release\quantum-fortune-teller-windows-x64.zip" -Force
  echo Windows version packaging completed!
) else (
  echo Windows version directory not found, skipping...
)

REM Check Linux version directory
if exist "dist\quantum-fortune-teller-linux-x64" (
  echo Packaging Linux version...
  powershell Compress-Archive -Path "dist\quantum-fortune-teller-linux-x64\*" -DestinationPath "release\quantum-fortune-teller-linux-x64.zip" -Force
  echo Linux version packaging completed!
) else (
  echo Linux version directory not found, skipping...
)

REM Check macOS version directory
if exist "dist\quantum-fortune-teller-darwin-x64" (
  echo Packaging macOS version...
  powershell Compress-Archive -Path "dist\quantum-fortune-teller-darwin-x64\*" -DestinationPath "release\quantum-fortune-teller-macos-x64.zip" -Force
  echo macOS version packaging completed!
) else (
  echo macOS version directory not found, skipping...
)

echo Packaging completed!
echo Release files are located in the release directory
pause 