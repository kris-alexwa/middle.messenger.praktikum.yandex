FROM node:16.14.0-alpine

WORKDIR /var/www/app

COPY package-lock.json package.json ./

RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000

CMD npm run start
