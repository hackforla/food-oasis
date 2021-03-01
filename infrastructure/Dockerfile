FROM node:alpine as clientBuilder

RUN mkdir /app
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client .

RUN npm run build

# Server Container
FROM node:12-buster-slim
LABEL maintainer.fola="foodoasis@hackforla.org"
LABEL org.hackforla="Hack For LA"
LABEL description="Food Oasis app"

WORKDIR /fola
COPY ./server/package*.json ./
RUN npm ci

# TODO @jafow re-structure directory heirarchy so we can flatten these down
COPY ./server/middleware/ ./middleware
COPY ./server/app/ ./app
COPY ./server/server.js ./
#COPY db/config.js ./db/
COPY --from=clientBuilder /app/build ./client/build

# we dont want to run as sudo so create group and user
RUN groupadd -r fola && useradd --no-log-init -r -g fola fola
USER fola

EXPOSE 5000

ENTRYPOINT ["/usr/local/bin/node", "server.js"]
