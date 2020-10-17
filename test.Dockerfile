FROM node:14-alpine

# MUST BIND YOUR DEV DIRECTORY TO /usr/src/app!

RUN apk add git

WORKDIR /usr/src/app

COPY ./client/rollup.config.js ./
COPY ./client/package*.json ./

RUN npm install

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]