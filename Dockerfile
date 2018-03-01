FROM node:8.9.4

COPY . /disk1/website/view-view

WORKDIR /disk1/website/view-view

EXPOSE 80

CMD node index
