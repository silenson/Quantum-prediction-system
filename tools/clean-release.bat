@echo off
echo Cleaning old release files...

REM 创建release目录（如果不存在）
if not exist release mkdir release

REM 保留最新的发布文件，删除旧文件
REM 这里我们不删除任何文件，因为我们希望保留最新的发布文件

echo Cleaning completed!
echo Only the latest release files remain in the release directory
pause 