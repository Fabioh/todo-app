FROM node:12.8.1-alpine

ADD . app/

WORKDIR /app

RUN npm i

CMD sleep 5 && node src/loader.js
