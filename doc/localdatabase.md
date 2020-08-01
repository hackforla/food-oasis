# Working with a Local Development Database

If you are working on issues that require making changes to the database schema or reference data (i.e., data that is considered part of the application, such as lookup lists, or, in the case of Food Oasis, Categories),
then you should work with a _copy_ of the shared development database on your local machine, which we will refer to as a _Local Database_.

## Overview of Steps

1.  Install Postgres

    - If you develop on an IOS, Linux or Windows Pro edition machine, you can [Install Docker Desktop](https://www.docker.com/get-started) for your machine and run a Postgres docker image.

    - Alternatively, on any machine, you can [Install Postgres](https://www.postgresql.org/download/) on your native O/S. This will also install Postgres' de-facto standard database development tool, pgAdmin. In fact, even if you intend to run your Local Database in docker, you still might want to install Postgres this way, just to install pgAdmin (the GUI development tool) and psql (the command-line tool for working with Postgres).

    - Windows Home Edition does not run docker very well as of July 2020, so we recommend running Postgres natively.

    - If you already have any instance of Postgres installed, you may just use your existing instance for development - you will just need to adjust the connection parameters accordingly.

2.  Create a _food_ database on Postgres
3.  Load the Food Oasis sample database into the _food_ database.

4.  Configure the development environment to connect to the local database by editing the .env file with your local database connection string information.

5.  Run database migrations to update the datbase with existing migration scripts to bring it up to date.

The following sections provide more detailed instructions for each of these steps.

## Install Postgres

We are currently running Postgres version 11.6 in production, so you generally want to run version 11.\* locally, for best compatibility.

### Running Postgres in a Docker Container

Install Docker Desktop from [here](https://www.docker.com/get-started) and follow the provided instructions. This will install Docker client and a local Docker daemon (server) that can host docker containers.

The following command will run if docker is set up and ready to go:

```
docker version
```

Then you can download the official postgis-enabled Postgres image from Docker Hub and create a local container named `foodoasisdb` by running:

```
docker run --name foodoasisdb \
-e POSTGRES_PASSWORD=pgpass \
-d -p 5433:5432  postgis/postgis
```

(Omit `sudo` on Windows)
This may take a little while, as it is installing Postgres on your docker server.

If you then run

```
docker ps
```

you should see a container with the name `foodoasisdb` running.

The connection parameters for a Postgres instance installed this way will be:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=pgpass
```

When creating the container, I specified mapping port 5433 to avoid conflicts with an existing default Postgres installation, which would be using the default port of 5432.

### Running Postgres on your native platform

To install Postgres directly on your native machine, just download and install Postgres by following the instructions [here](https://www.postgresql.org/download/). Be sure to choose the options to install any client tools (e.g., pgAdmin and psql), if the installation has such options. By default, the connection parameters for a database instance installed this way will be:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=pgpass
```

though we will install a database named _food_ below.

## Create an empty Database

### Create an empty Database with psql

If you followed the above instructions for installing natively, then you can connect via the psql utility and create a new database named foodoasis like this:

```
$ psql --host localhost --port 5433 --username postgres
psql (12.3)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

fola=# create database food;
CREATE DATABASE
fola=# \q

$
```

Alternatively, you can use a tool like DBeaver or pgAdmin to create a database named `food` with the default database creation settings.

## Load the Food Oasis Sample Database

A script file to populate the sample database can be found at /db/demo-db/foodoasis.sql. To use psql to run this script, run the following command from your terminal in the root directory:

```
psql -f db/demo-db/foodoasis.sql --host localhost --port 5433 --username postgres --dbname food
```

This loads a sample version of the database that was captured at one point in time. We now need to update this database with migration scripts that have been applied since that time as described in the
Database Migration section below.

If you don't want to use psql to load the sample database, you can use DBeaver, pgAdmin, or another client tool to create a connection to the database, then open and run the same script found at `/db/demo-db/foodoasis.sql to create and populate the starter database.

### Connecting the Application and Migrations

Getting the TDM application and migrations to connect to your local database is primarily a matter of getting the related .env settings set up properly for your local database. If you followed the above instructions for local database installation, the environment variables for using the Local Database will be

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=food
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=pgpass
```

Use POSTGRES_PORT=5433 instead if you installed Postgres to a docker container as described above.

Since I tend to switch around which local database I am using and also occasionally connect to the shared development server, I will generally have a few sets of connection parameter settings in my .env file, and uncomment only the set I need at that particular time.

### Apply Database Migrations

Open a terminal on the root drive of the repo and run

```
npm run migrate up
```

This will run the SQL scripts in the /migrations folder to modify the starter database with all the migration scripts in the github repo that bring the database up to date with the current `develop` branch.

At this point, you should be able to run the application as usual, and it will be using the local database.

## Making Changes to the Database Design or Reference Data

When you need to make changes to the database schema or reference data, you will need to write a new
migration script to effect the changes you want and try it out with your local database.

See [Database Migrations](/doc/migrations.md) for instructions on how to work with migrations.

When you submit your PR, the migration file will be included in your PR and get saved to the develop branch in the repo. The developer who merges to the develop branch should then be able to run migrations against the shared development database to apply your changes as part of the merge.

If for any reason, you corrupt your local database, you can simply drop the foodoasis database from your Local Database Server, re-create it empty and run migrations again to start over.
