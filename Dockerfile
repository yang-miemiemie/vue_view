FROM node:8.9.4

COPY . /usr/src/app/

WORKDIR /usr/src/app
RUN npm install

CMD ["npm", "run", "dev"]
