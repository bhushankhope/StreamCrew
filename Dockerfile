FROM node:14 AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install

# RUN npm run build
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0
COPY . .

# CMD ["npm", "start"]
RUN npm run build


FROM nginx:1.17.1-alpine
COPY src/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/videojs-angular-demo /usr/share/nginx/html
