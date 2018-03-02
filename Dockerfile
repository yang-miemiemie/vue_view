FROM node:8.9.4

COPY package.json package-lock.json /usr/src/app/

WORKDIR /usr/src/app
RUN npm install --registry=https://registry.npm.taobao.org

CMD ["npm", "run", "dev"]
