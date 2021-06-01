# syntax=docker/dockerfile:1

FROM node:10.19.0

EXPOSE 3000

ARG SERVER_URL=localhost:8080
ENV REACT_APP_URL=${SERVER_URL}

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]