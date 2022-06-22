FROM node:16
WORKDIR /usr/src/app

COPY . .
RUN yarn --frozen-lockfile
RUN apt-get update && apt-get install -y lua5.3

EXPOSE 8080
CMD [ "node", "src/index.js" ]
