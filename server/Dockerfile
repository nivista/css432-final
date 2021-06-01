# syntax=docker/dockerfile:1

FROM node:10.19.0

EXPOSE 8080

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]