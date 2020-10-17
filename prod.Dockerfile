FROM node:14-alpine

RUN apk add git

WORKDIR /usr/src/app

COPY ./client/rollup.config.js ./
COPY ./client/package*.json ./

RUN npm install

COPY ./client/src ./src
COPY ./client/public ./public

RUN npm run-script build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]