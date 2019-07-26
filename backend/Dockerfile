FROM node:12.7-alpine

ADD . app/

WORKDIR /app

RUN npm i

CMD sleep 5 && node src/loader.js
