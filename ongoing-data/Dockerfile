FROM node:12.18.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src
CMD npx wait-port mongo:27017 && \
    node ./src/index.js