composer card create -p /tmp/composer/sift/sift-network-sift.json -u ray -n sift-network -c ray/admin-pub.pem -k ray/admin-priv.pem
composer card import -f ray@sift-network.card
composer network ping -c ray@sift-network
