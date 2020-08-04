FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY ormconfig.js ./build/
COPY .env ./build/
WORKDIR ./build

EXPOSE 4000
CMD node src/server.js