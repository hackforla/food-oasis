# Developing in Docker

## (Very Rough Draft)

It is possible to do your development in docker, i.e., writing and debugging
the source code within docker. The advantage of doing so is that the
environment will exactly replicate the deployment environment, as far as
underlying operating system, node dependencies, etc., so there should be
no unpleasant surprises when you attempt to build the docker container for deployment.

This type of development environment is generally not necessary, and for
experienced developers, and these notes are very preliminary and not well-tested or maintained.

The server and database can be run in docker using `docker-compose`.

## Prerequisites

Install [Docker v19.03+](https://docs.docker.com/get-docker/)

## Initial Startup

The first time booting with docker it's required to setup the intial state of
the database.

1. start the docker postgres instance:

```bash
$ docker-compose up db
```

2. apply the [./db/demo-db/foodoasis.sql](./db/demo-db/foodoasis.sql) dump to
   the docker postgres instance using your favorite db client

   For example, with `psql` do:

```bash
$ psql -U fola -d food -h localhost -p 5433 -W -f db/demo-db/foodoasis.sql
```

You should be prompted for a password. Use `pgpass`.

This should result in a successful import of the initial data and schema that
are not tracked in the [migrations](./migrations) folder.

3. last, boot the full composition with both the server and db

```bash
$ docker-compose up --build
```

## debugging and development

debugging and development should support the same workflow you use working out
of docker. There are some helpful tools to consider using.

VSCode has a [helpful plugin and
guide](https://code.visualstudio.com/docs/containers/debug-common) on
debugging an application running in docker.

NodeJS [official guide to
debugging](https://nodejs.org/en/docs/guides/debugging-getting-started/#command-line-options)
describes how to use `node inspector`.
