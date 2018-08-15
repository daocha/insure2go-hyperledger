FROM hyperledger/composer-rest-server:0.19.12

LABEL sift.insure "Ray LI <ray@dcha.xyz>"

RUN npm install --production passport-jwt loopback-connector-mongodb && \
    npm cache clean --force && \
    ln -s /home/composer/node_modules /home/composer/.node_modules

# change the default root path from / to /chain && set ttl to 1 day (86400 seconds)
RUN cp /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/config.json \
    /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/config-bak.json && \
    cp /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/server.js \
    /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/server-bak.js && \
    cp /home/composer/.npm-global/lib/node_modules/composer-rest-server/common/models/user.json \
    /home/composer/.npm-global/lib/node_modules/composer-rest-server/common/models/user-bak.json && \
    sed 's/"\/api"/"\/chain"/' /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/config-bak.json > \
          /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/config.json && \
    sed 's/\/explorer/\/chain\/explorer/; s/\/auth/\/chain\/auth/' /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/server-bak.js > \
          /home/composer/.npm-global/lib/node_modules/composer-rest-server/server/server.js && \
    sed 's/\"properties\":/\"ttl\": 86400\,\n    \"properties\":/' /home/composer/.npm-global/lib/node_modules/composer-rest-server/common/models/user-bak.json > \
          /home/composer/.npm-global/lib/node_modules/composer-rest-server/common/models/user.json

# Composre required environment variables
ENV COMPOSER_CARD=ray@sift-network \
    COMPOSER_NAMESPACES=never \
    COMPOSER_AUTHENTICATION=true \
    COMPOSER_MULTIUSER=false \
    COMPOSER_PROVIDERS='{"jwt":{"provider":"jwt","module":"/home/composer/app/custom-jwt.js","secretOrKey":"2VybmFtZSI6InJheUBkYWSjeUa6ckhB7G4kB8oihlPFTpbkflGIaeFtl82KyO3BVRuv5qiwWUy9jaGEubWUiLCJpYXQiOjE1MzQwODExMTYsImV4cCI6MTUzNDE2NzUxNiwiaXNzIjoic2lmdC5pbnN1cmUi","authScheme":"saml","authPath":"/chain/auth/jwt","callbackPath":"/chain/auth/jwt/callback","successRedirect":"/chain/explorer","failureRedirect":"/chain/error"}}' \
    COMPOSER_DATASOURCES='{"db":{"name":"db","host":"192.168.88.135","port":"27017","database":"composer_jwt","username":"composer_jwt","password":"composer_jwt","connector":"mongodb"}}' \
    PATH=/home/composer/.npm-global/bin:$PATH

COPY ./custom-jwt.js /home/composer/app/

# Run in the composer users home directory.
WORKDIR /home/composer/app

# Expose port 3000
EXPOSE 3000
