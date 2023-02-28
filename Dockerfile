FROM node:18.14.1-alpine

WORKDIR /usr/src/app

COPY src ./src
COPY prisma ./prisma
COPY package.json ./
COPY yarn.lock ./

RUN corepack enable
RUN yarn install
RUN yarn prisma migrate dev --name init
RUN yarn build

RUN rm -r ./src

ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone

EXPOSE 3333
CMD [ "node", "./dist/server.js" ]