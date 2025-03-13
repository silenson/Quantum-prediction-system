@echo off
echo Splitting large files for GitHub upload...

REM 创建分割文件目录
if not exist split-files mkdir split-files

REM 使用PowerShell分割Windows版本文件
echo Splitting Windows version...
powershell -Command "$file = Get-Item 'release\quantum-fortune-teller-windows-x64.zip'; $bytes = [System.IO.File]::ReadAllBytes($file.FullName); $chunks = [Math]::Ceiling($bytes.Length / 90MB); for ($i = 0; $i -lt $chunks; $i++) { $start = $i * 90MB; $end = [Math]::Min(($i + 1) * 90MB, $bytes.Length); $chunk = $bytes[$start..($end-1)]; [System.IO.File]::WriteAllBytes(\"split-files\quantum-fortune-teller-windows-x64.zip.part$($i+1)of$chunks\", $chunk); }"
echo Windows version split completed!

REM 使用PowerShell分割Linux版本文件
echo Splitting Linux version...
powershell -Command "$file = Get-Item 'release\quantum-fortune-teller-linux-x64.zip'; $bytes = [System.IO.File]::ReadAllBytes($file.FullName); $chunks = [Math]::Ceiling($bytes.Length / 90MB); for ($i = 0; $i -lt $chunks; $i++) { $start = $i * 90MB; $end = [Math]::Min(($i + 1) * 90MB, $bytes.Length); $chunk = $bytes[$start..($end-1)]; [System.IO.File]::WriteAllBytes(\"split-files\quantum-fortune-teller-linux-x64.zip.part$($i+1)of$chunks\", $chunk); }"
echo Linux version split completed!

echo All files have been split into parts under 90MB.
echo Please upload these files to GitHub Releases.
pause 