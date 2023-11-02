@echo off
start cmd /k ngrok http --host-header=localhost 3000
start cmd /k npm run start
timeout /T 10
start http://localhost:3000/shows
pause
taskkill /F /IM node.exe
taskkill /F /IM cmd.exe
exit