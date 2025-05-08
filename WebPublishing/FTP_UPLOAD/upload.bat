@echo off
setlocal

set "FTP_HOST=jqe06322.bplaced.net"
set "FTP_USER=jqe06322"
set "FTP_PASS=BqbHx!c5Z.Z!Ce7"
set "LOCAL_DIR=C:\Users\Max\Desktop\Programmierung\m293_Webentwicklung\WebPublishing\FTP_UPLOAD\Upload"
set "REMOTE_DIR=/www/"


cd /d "%LOCAL_DIR%" || (
  echo kein ordner gefunden
  pause
  exit /b 1
)



for %%F in (*.*) do (
  echo Upload: %%F
  curl --ftp-pasv -T "%%F" "ftp://%FTP_USER%:%FTP_PASS%@%FTP_HOST%%REMOTE_DIR%%%F"
  if errorlevel 1 (
    echo  Upload fehler von %%F
  ) else (
    echo %%F hochgeladen
  )
  echo.
)

echo Fertig.
pause
