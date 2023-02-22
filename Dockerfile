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

EXPOSE 3333
CMD [ "node", "./dist/server.js" ]