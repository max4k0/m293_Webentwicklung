@echo off
cd /d %~dp0
ftp -s:ftp-upload-script.ftp

pause
