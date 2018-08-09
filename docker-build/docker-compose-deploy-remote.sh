basename="$(dirname $0)"
cd $basename
source ./envvars.txt

local_folder=$SIFTLEDGER_LOCAL_FOLDER
remote_folder=$SIFTLEDGER_REMOTE_FOLDER
remote_server=$SIFTLEDGER_REMOTE_SERVER
rsa_key=$SIFTLEDGER_REMOTE_SERVER_RSA_KEY
app_name="composer-rest-server"
app_image_name="$SIFTLEDGER_APP_PREFIX/$app_name"

# build apps
echo "[Docker-compose buiding apps]"
docker-compose -f ./docker-compose-hyperledger.yml build

# dump all images
echo "[Dump image to folder $local_folder]"
docker save $app_image_name > $local_folder/$app_name.tar

# transfer all images to server
echo "[Transferring files to test server: $remote_server]"
scp -i $rsa_key $local_folder/$app_name.tar $remote_server:$remote_folder/

# transfer scripts to server
scp -i $rsa_key ./docker-compose-hyperledger.yml $remote_server:$remote_folder/
scp -i $rsa_key ./envvars.txt $remote_server:$remote_folder/
scp -i $rsa_key ./docker-compose-hyperledger-startup.sh $remote_server:$remote_folder/

# execute scripts on server
ssh -i $rsa_key $remote_server $remote_folder/docker-compose-hyperledger-startup.sh
