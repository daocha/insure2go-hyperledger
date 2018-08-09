awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' fabric-samples/sift-network/crypto-config/peerOrganizations/sift.insure/peers/peer0.sift.insure/tls/ca.crt > /tmp/composer/org1/ca-org1.txt
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' fabric-samples/sift-network/crypto-config/peerOrganizations/aig.com/peers/peer0.aig.com/tls/ca.crt > /tmp/composer/org2/ca-org2.txt
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' fabric-samples/sift-network/crypto-config/ordererOrganizations/sift.insure/orderers/orderer.sift.insure/tls/ca.crt > /tmp/composer/ca-orderer.txt
