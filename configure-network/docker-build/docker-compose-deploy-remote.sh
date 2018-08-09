basename="$(dirname $0)"
cd $basename
source ./envvars.txt

local_folder=$INSURE2GO_LOCAL_FOLDER
remote_folder=$INSURE2GO_REMOTE_FOLDER
remote_server=$INSURE2GO_REMOTE_SERVER
rsa_key=$INSURE2GO_REMOTE_SERVER_RSA_KEY

# build base image
echo "[Docker building base image]"
./docker-build-base.sh

# build apps
echo "[Docker-compose buiding apps]"
docker-compose -f ./docker-compose.yml build

# dump all images
echo "[Dump all images to folder $local_folder]"
./docker-all-images.sh save $local_folder

# transfer all images to server
echo "[Transferring files to test server: $remote_server]"
scp -i $rsa_key $local_folder/insure2go/*.dim $remote_server:$remote_folder/

# transfer scripts to server
scp -i $rsa_key ./docker-compose.yml $remote_server:$remote_folder/
scp -i $rsa_key ./docker-compose-dev-override.yml $remote_server:$remote_folder/
scp -i $rsa_key ./docker-compose-db.yml $remote_server:$remote_folder/
scp -i $rsa_key ./envvars.txt $remote_server:$remote_folder/

scp -i $rsa_key ./docker-compose-startup.sh $remote_server:$remote_folder/
scp -i $rsa_key ./docker-all-images.sh $remote_server:$remote_folder/

# execute scripts on server
ssh -i $rsa_key $remote_server $remote_folder/docker-compose-startup.sh
