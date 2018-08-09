#!/bin/bash

basename="$(dirname $0)"
cd $basename
source ./envvars.txt

app_prefix=$INSURE2GO_APP_PREFIX

# remove existing containers and images
echo "Stopping containers: $app_prefix*"
docker stop $(docker ps -f name=$app_prefix -aq)

echo "Removing containers: $app_prefix*"
docker rm $(docker ps -f name=$app_prefix -aq)

echo "Removing images: $app_prefix/*"
docker rmi -f $(docker images $app_prefix\/* -aq)

# load all images
echo "Loading all images $app_prefix*"
./docker-all-images.sh load

# make sure all folders are created
echo "Craeting folders"
# create data folder for mongodb
mkdir -p ~/apps/database/mongo/db
# create data folder for neo4j
mkdir -p ~/apps/database/neo4j/db
# create log folder for apps
mkdir -p /media/data/logs
# create folder for nginx
mkdir -p ~/apps/nginx
touch ~/apps/nginx/error.log
touch ~/apps/nginx/access.log

# boot up containers
echo "Docker-compose creating and starting containers"
docker-compose -f ./docker-compose.yml -f ./docker-compose-dev-override.yml \
 -f ./docker-compose-db.yml up -d --no-recreate
#docker-compose -f ./docker-compose-dev.yml up -d
