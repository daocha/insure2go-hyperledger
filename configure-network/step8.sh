export ORG2=fabric-samples/sift-network/crypto-config/peerOrganizations/aig.com/users/Admin@aig.com/msp

cp -p $ORG2/signcerts/A*.pem /tmp/composer/aig

cp -p $ORG2/keystore/*_sk /tmp/composer/aig
