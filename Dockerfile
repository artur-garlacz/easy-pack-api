FROM node:18.12.1-slim as builder
USER root

WORKDIR /usr/src/easy-pack
RUN npm i -g pnpm

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN pnpm install

COPY . .

FROM builder as dev
EXPOSE 8000

CMD [ "pnpm", "start" ]