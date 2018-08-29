const request = require('request-promise');
const KMS_URL =  process.env.INSURE2GO_KMS_URL || 'http://kms:5000/kms/load/composer';
if(process.env.INSURE2GO_SERVER == 'PROD'){
  // Load configuration from KMS
  console.log("Loading configuration from KMS: " + KMS_URL);
  loadFromKMS();
}else{
  setup();
}

async function loadFromKMS(){
  await request({
    uri: KMS_URL
  }).then((res, err) => {
    console.log("Successfully responded from KMS");
    //console.log("Response from KMS: " + res);
    KMS_CONFIG = JSON.parse(res);
    setup();
  }).catch(function(err) { // catch error
    console.error(err);
  });
}

function setup(){
  if(typeof KMS_CONFIG != "undefined"){
    console.log("Exporting variables with values from ***KMS***...");
    COMPOSER_PROVIDERS = {
      "jwt": {
        "provider": "jwt",
        "module": "/home/composer/app/custom-jwt.js",
        "secretOrKey": KMS_CONFIG['JWT_SECRET_KEY'],
        "authScheme": "saml",
        "authPath": "/chain/auth/jwt",
        "callbackPath": "/chain/auth/jwt/callback",
        "successRedirect": "/chain/explorer",
        "failureRedirect": "/chain/error"
      }
    };
    COMPOSER_DATASOURCES = {
      "db": {
        "name": "db",
        "host": KMS_CONFIG['Mongo']['db_host_composer'],
        "port": KMS_CONFIG['Mongo']['db_port_composer'],
        "database": KMS_CONFIG['Mongo']['db_name_composer'],
        "username": KMS_CONFIG['Mongo']['username_composer'],
        "password": KMS_CONFIG['Mongo']['password_composer'],
        "connector": "mongodb"
      }
    };
  }else{
    console.log("Exporting variables with DEVELOPMENT values...");
    COMPOSER_PROVIDERS = {
      "jwt": {
        "provider": "jwt",
        "module": "/home/composer/app/custom-jwt.js",
        "secretOrKey": "2VybmFtZSI6InJheUBkYWSjeUa6ckhB7G4kB8oihlPFTpbkflGIaeFtl82KyO3BVRuv5qiwWUy9jaGEubWUiLCJpYXQiOjE1MzQwODExMTYsImV4cCI6MTUzNDE2NzUxNiwiaXNzIjoic2lmdC5pbnN1cmUi",
        "authScheme": "saml",
        "authPath": "/chain/auth/jwt",
        "callbackPath": "/chain/auth/jwt/callback",
        "successRedirect": "/chain/explorer",
        "failureRedirect": "/chain/error"
      }
    };
    COMPOSER_DATASOURCES = {
      "db": {
        "name": "db",
        "host": "192.168.88.135",
        "port": "27017",
        "database": "composer_jwt",
        "username": "composer_jwt",
        "password": "composer_jwt",
        "connector": "mongodb"
      }
    };
  }
  console.log("Setting environment variables...");
  var fs = require('fs');
  fs.writeFile("/home/composer/.npm-global/lib/node_modules/composer-rest-server/server/providers.json", JSON.stringify(COMPOSER_PROVIDERS));
  fs.writeFile("/home/composer/.npm-global/lib/node_modules/composer-rest-server/server/datasources.json", JSON.stringify(COMPOSER_DATASOURCES));
}
