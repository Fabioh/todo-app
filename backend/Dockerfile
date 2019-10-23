FROM node:13-alpine

ADD . app/

WORKDIR /app

RUN npm i

CMD sleep 5 && node src/loader.js
