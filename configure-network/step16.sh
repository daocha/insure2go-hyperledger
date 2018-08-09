composer card create -p /tmp/composer/aig/sift-network-aig.json -u ana -n sift-network -c ana/admin-pub.pem -k ana/admin-priv.pem
composer card import -f ana@sift-network.card
composer network ping -c ana@sift-network
