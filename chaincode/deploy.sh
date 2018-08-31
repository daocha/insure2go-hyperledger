basename="$(dirname $0)"
cd $basename
source ./envvars.txt

scp -i $INSURE2GO_REMOTE_SERVER_RSA_KEY models/*.cto $INSURE2GO_REMOTE_SERVER:/home/daocha/hyperledger/tutorial-deploy-multi-organization/sift-network/models/
scp -i $INSURE2GO_REMOTE_SERVER_RSA_KEY scripts/*.js $INSURE2GO_REMOTE_SERVER:/home/daocha/hyperledger/tutorial-deploy-multi-organization/sift-network/lib/
scp -i $INSURE2GO_REMOTE_SERVER_RSA_KEY queries.qry $INSURE2GO_REMOTE_SERVER:/home/daocha/hyperledger/tutorial-deploy-multi-organization/sift-network/
scp -i $INSURE2GO_REMOTE_SERVER_RSA_KEY package.json $INSURE2GO_REMOTE_SERVER:/home/daocha/hyperledger/tutorial-deploy-multi-organization/sift-network/
