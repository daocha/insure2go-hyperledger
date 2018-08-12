module.exports = {
  // 1. MongoDB
  MONGO_URI: process.env.MONGO_URI || 'mongodb://composer_jwt:composer_jwt@192.168.88.135:27017/composer_jwt',

  // 2. JWT
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || '2VybmFtZSI6InJheUBkYWSjeUa6ckhB7G4kB8oihlPFTpbkflGIaeFtl82KyO3BVRuv5qiwWUy9jaGEubWUiLCJpYXQiOjE1MzQwODExMTYsImV4cCI6MTUzNDE2NzUxNiwiaXNzIjoic2lmdC5pbnN1cmUi',
  JWT_TOKEN_EXPIRY: '1d',
  JWT_TOKEN_ALGORITHM: 'HS512',
  JWT_TOKEN_ISSUER: 'sift.insure',

  // 3. Express Server Port
  LISTEN_PORT: process.env.LISTEN_PORT || 3001
};
