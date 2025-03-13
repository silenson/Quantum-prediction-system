@echo off
echo 正在合并分割文件...

REM 创建输出目录
if not exist combined mkdir combined

REM 合并Windows版本文件
echo 正在合并Windows版本...
copy /b split-files\quantum-fortune-teller-windows-x64.zip.part* combined\quantum-fortune-teller-windows-x64.zip
echo Windows版本合并完成!

REM 合并Linux版本文件
echo 正在合并Linux版本...
copy /b split-files\quantum-fortune-teller-linux-x64.zip.part* combined\quantum-fortune-teller-linux-x64.zip
echo Linux版本合并完成!

echo 所有文件已合并完成!
echo 合并后的文件位于combined目录
pause 