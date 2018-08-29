# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM node:8.11.3-alpine

LABEL sift.insure "Ray LI <ray@dcha.xyz>"

# Reset npm logging to default level.
ENV NPM_CONFIG_LOGLEVEL warn

# Install the latest version by default.
ARG VERSION=0.19.12

COPY ["./custom-jwt.js", "./init_env.js", "./package.json", "/home/composer/app/"]

# Run in the composer users home directory.
WORKDIR /home/composer/app

# Need to install extra dependencies for native modules.
RUN deluser --remove-home node && \
    addgroup -g 1000 composer && \
    adduser -u 1000 -G composer -s /bin/sh -D composer && \
    apk add --no-cache make gcc g++ python git libc6-compat && \
    su -c "npm config set prefix '/home/composer/.npm-global'" - composer && \
    su -c "npm install --production -g pm2 composer-rest-server@${VERSION}" - composer && \
    npm install --production && \
    ln -s /home/composer/app/node_modules /home/composer/node_modules && \
    su -c "npm cache clean --force" - composer && \
    rm -rf /home/composer/.config /home/composer/.node-gyp /home/composer/.npm && \
    apk del make gcc g++ python git

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

# Run as the composer user ID.
USER composer

# Composre required environment variables
ENV COMPOSER_CARD=ray@sift-network \
    COMPOSER_NAMESPACES=never \
    COMPOSER_AUTHENTICATION=true \
    COMPOSER_MULTIUSER=false \
    PATH=/home/composer/.npm-global/bin:$PATH

# Run supervisor to start the application.
CMD node init_env.js && sleep 5 && pm2-docker composer-rest-server

# Expose port 3000
EXPOSE 3000
