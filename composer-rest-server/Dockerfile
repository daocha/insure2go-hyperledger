FROM hyperledger/composer-rest-server

LABEL sift.insure "Ray LI <ray@dcha.xyz>"

RUN npm install --production passport-github && \
    npm cache clean --force && \
    ln -s node_modules .node_modules

EXPOSE 3000

COPY ["./composer-rest-server/envvars.txt", "/app/"]

RUN source /app/envvars.txt
