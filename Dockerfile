FROM node:8.9.4

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
