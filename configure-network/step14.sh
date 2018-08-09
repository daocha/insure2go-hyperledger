cp endorsement-policy.json /tmp/composer/endorsement-policy.json
composer network start -c PeerAdmin@sift-network-sift -n sift-network -V 0.0.1 -o endorsementPolicyFile=/tmp/composer/endorsement-policy.json -A ray -C ray/admin-pub.pem -A ana -C ana/admin-pub.pem
