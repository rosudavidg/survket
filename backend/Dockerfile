FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV DATABASE_HOST=192.168.100.6
ENV DATABASE_PORT=33070

CMD ["npm", "start"]