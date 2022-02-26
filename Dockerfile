FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY ./app.js ./app.js
COPY ./index.js ./index.js

EXPOSE 80

CMD [ "npm", "run", "start" ]
