composer participant add -c ray@sift-network -d '{ "$class": "org.sift.insure.network.Person",  "identityID": "0001",  "firstName": "Leon",  "lastName": "Kennedy",  "nationality": "US",  "countryResidence": "US",  "age": 35 }'
composer participant add -c ray@sift-network -d '{ "$class": "org.sift.insure.network.Person",  "identityID": "0002",  "firstName": "Ada",  "lastName": "Wong",  "nationality": "US",  "countryResidence": "US",  "age": 28 }'
composer identity issue -c ray@sift-network -f Leon.card -u leon.kennedy -a "resource:org.sift.insure.network.Person#0001"
composer identity issue -c ray@sift-network -f Ada.card -u ada.wong -a "resource:org.sift.insure.network.Person#0002"
composer card import -f Leon.card
composer card import -f Ada.card
composer network ping -c leon.kennedy@sift-network
composer network ping -c ada.wong@sift-network

