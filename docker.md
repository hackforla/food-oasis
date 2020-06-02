# Getting started

The server and database can be run in docker using `docker-compose`. 

## prerequisites
Install [Docker v19.03+](https://docs.docker.com/get-docker/)

## initial startup
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
$ psql -U fola -d food -h localhost -p 5433 -f db/demo-db/foodoasis.sql
```

This should result in a successful import of the initial data and schema that
are not tracked in the [migrations](./migrations) folder.

3. last, boot the full composition with both the server and db

```bash
$ docker-compose up --build
```
