docker stop $(docker ps -f name=peer -aq)
docker rm $(docker ps -f name=peer -aq)
docker stop $(docker ps -f name=couch -aq)
docker rm $(docker ps -f name=couch -aq)
docker stop $(docker ps -f name=cli -aq)
docker rm $(docker ps -f name=cli -aq)
docker stop $(docker ps -f name=orderer -aq)
docker rm $(docker ps -f name=orderer -aq)

