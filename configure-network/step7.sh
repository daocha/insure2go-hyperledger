export ORG1=fabric-samples/sift-network/crypto-config/peerOrganizations/sift.insure/users/Admin@sift.insure/msp

cp -p $ORG1/signcerts/A*.pem /tmp/composer/sift

cp -p $ORG1/keystore/*_sk /tmp/composer/sift
