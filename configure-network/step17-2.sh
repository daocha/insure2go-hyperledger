composer participant add -c ana@sift-network -d '{ "$class": "org.sift.insure.network.Person",  "identityID": "0003",  "firstName": "Rebecca",  "lastName": "Chambers",  "nationality": "US",  "countryResidence": "US",  "age": 25 }'
composer participant add -c ana@sift-network -d '{ "$class": "org.sift.insure.network.Person",  "identityID": "0004",  "firstName": "Sherry",  "lastName": "Berkin",  "nationality": "US",  "countryResidence": "US",  "age": 23 }'
composer identity issue -c ana@sift-network -f Rebecca.card -u rebecca.chambers -a "resource:org.sift.insure.network.Person#0003"
composer identity issue -c ana@sift-network -f Sherry.card -u sherry.berkin -a "resource:org.sift.insure.network.Person#0004"
composer card import -f Rebecca.card
composer card import -f Sherry.card
composer network ping -c rebecca.chambers@sift-network
composer network ping -c sherry.berkin@sift-network
