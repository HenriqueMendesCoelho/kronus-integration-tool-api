FROM node:24.3.0-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

RUN pnpm build

ENV TZ=America/Sao_Paulo

FROM node:24.3.0-alpine AS prod

WORKDIR /usr/src/app

# OpenSSL 1.1 is required for Prisma
RUN apk add --no-cache openssl1.1-compat

ENV TZ=America/Sao_Paulo

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3333
CMD [ "node", "./dist/server.js" ]