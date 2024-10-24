FROM node:lts-bullseye-slim as clientBuilder

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN mkdir /app
WORKDIR /app
COPY client/package.json .
COPY client/package-lock.json .
RUN npm ci
COPY client .
ENV NODE_ENV "production"
RUN npm run build
RUN echo package.json

# Server Build Container
FROM node:lts-bullseye-slim as serverBuilder

WORKDIR /usr/src
COPY tsconfig.json ./
WORKDIR /usr/src/app
RUN mkdir build
COPY ./server/tsconfig.json ./

COPY ./server/package.json ./
COPY ./server/package-lock.json ./

COPY ./server/middleware/ ./middleware
COPY ./server/types/ ./types
COPY ./server/app/ ./app
COPY ./server/server.ts ./
RUN npm ci --quiet && npm run build

# Server Container
FROM node:lts-bullseye-slim
LABEL maintainer.fola="foodoasis@hackforla.org"
LABEL org.hackforla="Hack For LA"
LABEL description="Food Oasis app"

WORKDIR /fola 
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
RUN npm ci --quiet

COPY --from=serverBuilder /usr/src/app/build ./
COPY ./server/uploads ./uploads
COPY --from=clientBuilder /app/build ./client/build

# we don't want to run as sudo so create group and user
RUN groupadd -r fola && useradd --no-log-init -r -g fola fola
USER fola

EXPOSE 5001

ENTRYPOINT ["/usr/local/bin/node", "./server.js"]
