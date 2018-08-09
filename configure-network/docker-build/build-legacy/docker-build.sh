#!/bin/bash

build() {
  local basename="$(dirname $0)"
  cd $basename
  source envvars.txt

  local app=$1
  local app_version=$2
  local app_image_name="$INSURE2GO_APP_PREFIX/$1"


  docker build -f ../../insure2go/microservice/$app/docker/Dockerfile \
  -t $app_image_name:$app_version -t $app_image_name:latest ../../
}

if [ "$1" = "" ] || [ "$2" = ""  ]; then
    echo "Usage: docker-build.sh [app_name] [version_num]"
else
    build $1 $2
fi
