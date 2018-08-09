#!/bin/bash
basename="$(dirname $0)"
cd $basename
source ./envvars.txt

base_image_name=$INSURE2GO_BASE_IMAGE_NAME
base_version=$INSURE2GO_BASE_VERSION

docker build -f ../docker/Dockerfile -t $base_image_name:$base_version ../
