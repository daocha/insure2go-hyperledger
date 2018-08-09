docker stop $(docker ps -f name=insure2go -aq)
docker rm $(docker ps -f name=insure2go -aq)
