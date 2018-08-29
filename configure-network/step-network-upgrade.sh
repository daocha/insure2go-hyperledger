export version=0.0.4

cd sift-network
composer archive create -t dir -n .

cd ..
composer network install --card PeerAdmin@sift-network-sift --archiveFile sift-network/sift-network@$version.bna
composer network install --card PeerAdmin@sift-network-aig --archiveFile sift-network/sift-network@$version.bna

cp endorsement-policy.json /tmp/composer/endorsement-policy.json
composer network upgrade -c PeerAdmin@sift-network-sift -n sift-network -V $version -o endorsementPolicyFile=/tmp/composer/endorsement-policy.json
