FROM node:6.0.0

COPY . /disk1/website/view-view

WORKDIR /disk1/website/view-view

EXPOSE 80

CMD node index
