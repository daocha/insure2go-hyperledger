#!/bin/bash

load() {
  local basename="$(dirname $0)"
  cd $basename
  source envvars.txt

  local app_name="$INSURE2GO_APP_PREFIX-$1"
  local app_image_name="$INSURE2GO_APP_PREFIX/$1"
  local image_folder=$INSURE2GO_REMOTE_FOLDER

  echo "Stopping container: $app_name"
  docker stop $(docker ps -f name=$app_name -aq)

  echo "Removing container: $app_name"
  docker rm $(docker ps -f name=$app_name -aq)

  echo "Removing image: $app_image_name"
  docker rmi -f $app_image_name

  echo "Loading image: $app_name"
  docker load < $image_folder/$app_name.tar
}

if [ "$1" = "" ]; then
    echo "Usage:  docker-load.sh [app_name]"
else
    load $1
fi
