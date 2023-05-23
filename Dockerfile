FROM arm64v8/node:18.16-slim

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

EXPOSE 3333
CMD [ "node", "./dist/server.js" ]