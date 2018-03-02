FROM node:8.9.4

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8888

CMD ["npm", "run", "dev"]
