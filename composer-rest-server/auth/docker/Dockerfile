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

COPY ./auth /app/auth

WORKDIR /app/auth

# Need to install extra dependencies for native modules.
RUN deluser --remove-home node && \
    addgroup -g 1000 composer && \
    adduser -u 1000 -G composer -s /bin/sh -D composer && \
    npm install --production && \
    npm cache clean --force && \
    rm -rf /home/composer/.config /home/composer/.node-gyp /home/composer/.npm

# Run as the composer user ID.
USER composer

# Run supervisor to start the application.
CMD [ "node", "/app/auth/app.js" ]

# Expose port 3001
EXPOSE 3001
