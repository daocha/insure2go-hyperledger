cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv11
./stopFabric.sh
./teardownFabric.sh

export FABRIC_VERSION=hlfv1
./stopFabric.sh
./teardownFabric.sh
