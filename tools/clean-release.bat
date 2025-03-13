@echo off
echo Cleaning old release files...

REM Delete files with Chinese characters in the name using PowerShell
powershell -Command "Remove-Item -Path 'release\*-Linux-x64.zip' -Force"
powershell -Command "Remove-Item -Path 'release\*-Windows-x64.zip' -Force"

echo Cleaning completed!
echo Only the latest release files remain in the release directory
pause 