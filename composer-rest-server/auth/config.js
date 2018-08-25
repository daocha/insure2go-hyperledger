const request = require('request-promise');
const KMS_URL =  process.env.INSURE2GO_KMS_URL || 'http://kms:5000/kms/load';
let config, loading_callback;
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
    console.log("module.exports = config #2");
    module.exports = config;
    if(typeof loading_callback == 'function'){
      console.log("Calling callback #2");
      loading_callback(config);
    }

  }).catch(function(err) { // catch error
    console.error(err);
  });
}

function setup(){
  // Production
  if(typeof KMS_CONFIG != "undefined"){
    console.log("Exporting variables with values from ***KMS***...");
    config = {
      // MongoDB
      MONGO_URI: process.env.MONGO_URI || 'mongodb://' +
      KMS_CONFIG['ComposerRestServer']['Mongo']['username_composer'] + ':' +
      KMS_CONFIG['ComposerRestServer']['Mongo']['password_composer'] + '@' +
      KMS_CONFIG['ComposerRestServer']['Mongo']['db_host_composer'] + ':' +
      KMS_CONFIG['ComposerRestServer']['Mongo']['db_port_composer'] + '/' +
      KMS_CONFIG['ComposerRestServer']['Mongo']['db_name_composer'],

      // JWT
      JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || KMS_CONFIG['ComposerRestServer']['JWT_SECRET_KEY'],
      JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY || '1d',
      JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM || 'HS512',
      JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER || 'sift.insure',

      // Composer external
      COMPOSER_AUTH_DOMAIN: process.env.COMPOSER_AUTH_DOMAIN || 'https://api.sift.insure',
      COMPOSER_AUTH_URI: process.env.COMPOSER_AUTH_URI || '/chain/auth/jwt/callback',

      // Express Server Port
      LISTEN_PORT: process.env.LISTEN_PORT || 3001
    };
  }
  // Development
  else{
    console.log("Exporting variables with DEVELOPMENT values...");
    config = {
      // MongoDB
      MONGO_URI: process.env.MONGO_URI || 'mongodb://composer_jwt:composer_jwt@192.168.88.135:27017/composer_jwt',

      // JWT
      JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || '2VybmFtZSI6InJheUBkYWSjeUa6ckhB7G4kB8oihlPFTpbkflGIaeFtl82KyO3BVRuv5qiwWUy9jaGEubWUiLCJpYXQiOjE1MzQwODExMTYsImV4cCI6MTUzNDE2NzUxNiwiaXNzIjoic2lmdC5pbnN1cmUi',
      JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY || '1d',
      JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM || 'HS512',
      JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER || 'sift.insure',

      // Composer external
      COMPOSER_AUTH_DOMAIN: process.env.COMPOSER_AUTH_DOMAIN || 'https://dev.api.sift.insure',
      COMPOSER_AUTH_URI: process.env.COMPOSER_AUTH_URI || '/chain/auth/jwt/callback',

      // Express Server Port
      LISTEN_PORT: process.env.LISTEN_PORT || 3001
    };
  }
}

module.exports = function(callback){
  if(typeof config != "undefined"){
    console.log("module.exports = config #1");
    module.exports = config;
    console.log("Calling callback #1");
    callback(config);
  }else{
    loading_callback = callback;
  }
}
