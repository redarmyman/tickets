FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ./node_modules/.bin/tsc

EXPOSE 8080
CMD [ "npm", "start" ]
