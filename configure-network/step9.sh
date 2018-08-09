cp sift-network.json /tmp/composer/
cp sift-network-sift.json /tmp/composer/sift/
cp sift-network-aig.json /tmp/composer/aig/
composer card create -p /tmp/composer/sift/sift-network-sift.json -u PeerAdmin -c /tmp/composer/sift/Admin@sift.insure-cert.pem -k /tmp/composer/sift/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@sift-network-sift.card
composer card create -p /tmp/composer/aig/sift-network-aig.json -u PeerAdmin -c /tmp/composer/aig/Admin@aig.com-cert.pem -k /tmp/composer/aig/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@sift-network-aig.card
composer card import -f PeerAdmin@sift-network-sift.card --card PeerAdmin@sift-network-sift
composer card import -f PeerAdmin@sift-network-aig.card --card PeerAdmin@sift-network-aig
