FROM node:16.14.2-alpine

RUN apk add --no-cache bash

#RUN npm i -g @nestjs/cli@8.2.4 npm-check-updates
RUN npm i -g @nestjs/cli@8.2.4

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /home/node/app
