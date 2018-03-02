FROM node:8.9.4

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

ENV HOST 0.0.0.0
ENV PORT 8888

EXPOSE 8888

CMD ["npm", "run", "dev"]
