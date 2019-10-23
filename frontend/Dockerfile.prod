# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:12.6-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN rm webpack.config.js && mv webpack.config.prod.js webpack.config.js
ARG configuration=production
RUN npm run production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.5-alpine
COPY --from=build-stage /app/public/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf