#!/bin/bash

run() {
  local basename="$(dirname $0)"
  cd $basename
  source envvars.txt

  local app_name="$INSURE2GO_APP_PREFIX-$1"
  local app_image_name="$INSURE2GO_APP_PREFIX/$1"
  local app_version=$INSURE2GO_BASE_VERSION
  local host_port=$2
  local folder=$INSURE2GO_REMOTE_FOLDER
  local log_folder=$INSURE2GO_LOG_FOLDER

  echo "Starting container $app_name"
  docker run --name $app_name -d -p $host_port:5000 -v $log_folder:/app/logs \
  $app_image_name:$app_version
}

if [ "$1" = "" ] || [ "$2" = "" ]; then
    echo "Usage:  docker-run.sh [app_name] [remote_port]"
else
    run $1 $2
fi
