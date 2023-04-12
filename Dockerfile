FROM node:14 AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install

# ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD ["npm", "start"]


FROM nginx:1.17.1-alpine
COPY src/nginx.conf /etc/nginx/nginx.conf
COPY /dist/videojs-angular-demo /usr/share/nginx/html
