@ echo off
call npm run build:renderer
docker stop electron-react-app && docker rm electron-react-app
docker rmi electron-react-app
docker build -t electron-react-app -f dockerfile_deploy .
docker run -d --name electron-react-app -p 3000:3000 electron-react-app