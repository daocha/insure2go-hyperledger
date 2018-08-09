#!/bin/bash

run() {
  local basename="$(dirname $0)"
  cd $basename
  source envvars.txt

  local local_folder=$INSURE2GO_LOCAL_FOLDER
  local remote_folder=$INSURE2GO_REMOTE_FOLDER
  local remote_server=$INSURE2GO_REMOTE_SERVER
  local app_name="$INSURE2GO_APP_PREFIX-$1"
  local app_image_name="$INSURE2GO_APP_PREFIX/$1"
  local rsa_key=$INSURE2GO_REMOTE_SERVER_RSA_KEY


  echo "[Docker building base image]"
  ../docker-build-base.sh

  echo "[Docker building app: $1]"
  ./docker-build.sh $1 latest

  echo "[Dump image to folder $local_folder]"
  docker save $app_image_name > $local_folder/$app_name.tar

  echo "[Transferring files to test server: $remote_server]"
  scp -i $rsa_key $local_folder/$app_name.tar $remote_server:$remote_folder/
  scp -i $rsa_key ./docker-load.sh $remote_server:$remote_folder/
  scp -i $rsa_key ./docker-run.sh $remote_server:$remote_folder/

  echo "[Loading image $app_image_name on test server: $remote_server]"
  ssh -i $rsa_key $remote_server $remote_folder/docker-load.sh $1

  echo "[Starting container on test server: $remote_server]"
  ssh -i $rsa_key $remote_server $remote_folder/docker-run.sh $1 $2
}

if [ "$1" = "" ] || [ "$2" = ""  ]; then
    echo "Usage: docker-deploy-remote.sh [app_name] [port]"
else
    run $1 $2
fi
