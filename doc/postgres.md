# How to work with Postgres

Several cloud hosts have free Postgres hosting. We are currently hosting our
_production_ and _shared development_ databases on Amazon Web Services (AWS).

To just run the application, you will not need to install any postgres-related
software on your machine, but you will need connection information to connect to the cloud
database, and the connection information cannot be kept in a public GitHub repo.
The standard way to do this for a node app is to have a file called .env that
belongs in the same folder as the node server file (server.js), but is listed
in the .gitignore file, so that it is not in the public repo. We need to
distribute this file to each member of the team via a more secure channel.

You will need to contact one of the developers to get access to the .env
file with the database connection information. In the two cloud databases, the application should always use the Postgres user _appuser_ to connect to the
database, as it has the permissions needed to run the application. The _postgres_ user has root-level permissions, which may be required to perform database migrations, etc.
If you need to connect with database development and adminstration tools such as pgAdmin or DBeaver, you can use
these login credentials with care. Only developers involved
in database administration and production support will need
the production credentials.

If you are working on issues that require modification of the
datbase schema or data, you should do your development with
a _local development database_ as described next.

## Installing Postgres locally and/or installing Postgres utilities

You can install Postgres by installing the package from here:
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

This will install the database engine itself, as well as _pgAdmin_, a good administration tool which allows you to connect
to Postgres databases, view data, etc.

To use these utilities from your terminal, you will need to add the appropriate folder to
your path. On a Mac, I needed to add

```
PATH=/Library/PostgreSQL/11/bin:$PATH
```

to my .bash_profile file.

On Windows, go to the Control Panel -> System Properties => Advanced Tab => Environment Variables Button => Select the Path variable and click the Edit button, then click the New button to add

```
C:\Program Files\PostgreSQL\12\bin
```

Click the New button again and add

```
C:\Program Files\PostgreSQL\12\lib
```

to your path.

## Connecting to Postgres from psql

To establish a connection to a PostgreSQL database named `food` on the local database instance `localhost` on the default port `5432` as user `postgres` with password `pgpass` using the command-line utility _psql_:

```
psql --host localhost --port 5432 -U postgres --d food --password
```

which should prompt you for the password. Using the
more concise single-character command line options, the above command would be

```
psql -h localhost -p 5432 -U postgres -d food -W
```

If you omit any of the connection parameters, the command will look for environment variables for the missing parts. On Windows running a Git Bash terminal, you can set the environment variables PGHOST, PGDATABASE, PGPORT, PGUSERNAME and PGPASSWORD to the appropriate values, restart VSCode and/or your Git Bash shell, and simply type `psql` to login to your database. (You could set these in your ~/.bash_profile file instead, but by setting them in Windows, you can also use psql from a Windows command line as well as the bash shell.)

If you ever work with more than one set of database credentials, then the problem with environment variables is that there is only one set of them, so we need a way to conveniently store multiple sets of database credentials securely - this is what .pgpass is for.

## Moving a Postgres Database

Now, to dump the contents of a local postgres database "foodoasis" to a file:

```
pg_dump -d foodoasis -U postgres  -f foodoasis.sql
```

To dump a remote database:

```
pg_dump --dbname <POSTGRES_DATABASE> --host <POSTGRES_HOST> --username <POSTGRES_USERNAME> --file foodoasis.sql --verbose --clean --no-owner --no-privileges --if-exists --password
```

where you replace the tokens in <> with the corresponding entries from the .env file in the project. You will be interactively prompted for the password (also in the .env file).

To upload this database to a remote postgres database, first create the remote database, then

```
psql -f foodoasis.sql --host <database host goes here> --port 5432 --username foodoasis --dbname foodoasis
```

You should be prompted for the remote database password, and then the data should be imported to the remote
database.

To restore the dump to a local database, first create an empty database (foodoasis in the following), then:

```
sudo psql --host localhost --username postgres --dbname foodoasis --file foodoasis.sql
```

(Omit sudo on a Windows machine)

You should be prompted for the password for your local Postgres instance.

There will be errors if using postgres versions other than 11.

## Setting up an application user login with reduced permissions

It is good practice to create a database user that has only the database permissions
required to run the application, to somewhat limit the damage a user who has the
credentials can do.

Here are the steps to create a `readwrite` role and an `appuser` login with that role:

```
CREATE ROLE readwrite;

GRANT CONNECT ON DATABASE foodoasisprod TO readwrite;

GRANT USAGE, CREATE ON SCHEMA public TO readwrite;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO readwrite;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES to readwrite;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO readwrite;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO readwrite;

CREATE USER appuser WITH PASSWORD '<strongpassword>';

GRANT readwrite to appuser;
```

where, of course, you want to replace `<strongpassword>` with a good password.
