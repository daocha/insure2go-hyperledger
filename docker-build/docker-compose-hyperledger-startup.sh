#!/bin/bash

basename="$(dirname $0)"
cd $basename
source ./envvars.txt

app_prefix=$SIFTLEDGER_APP_PREFIX
image_folder=$SIFTLEDGER_REMOTE_FOLDER
app_name="composer-rest-server"

# remove existing containers and images
echo "[Stopping containers: $app_prefix*]"
docker stop $(docker ps -f name=$app_prefix -aq)

echo "[Removing containers: $app_prefix*]"
docker rm $(docker ps -f name=$app_prefix -aq)

echo "[Removing images: $app_prefix/*]"
docker rmi -f $(docker images $app_prefix\/* -aq)

# load all images
echo "[Loading all images $app_prefix*]"
docker load < $image_folder/$app_name.tar

# boot up containers
echo "[Docker-compose creating and starting containers]"
docker-compose -f ./docker-compose-hyperledger.yml up -d --no-recreate
#docker-compose -f ./docker-compose-dev.yml up -d
