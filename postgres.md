# How to work with Postgres

Several cloud hosts have free Postgres hosting. We are currently using a free
Postgres instance on Heroku.

To just run the application, you will not need to install any postgres applications on your machine.

The application does, however, need connection information to connect to the cloud
database, and the connection information should not be kept in a public GitHub repo.
The standard way to do this for a node app is to have a file called .env that
belongs in the same folder as the node server file (server.js), but is listed
in the .gitignore file, so that it is not in the public repo. We need to
distribute this file to each member of the team via a more secure channel.

## Installing Postgres locally and/or installing Postgres utilities

You can install Postgres by installing the package from here:
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

This will install pdAdmin, a good administration tool which allows you to connect
to Postgres databases, view data, etc.

To use these utilities from your terminal, you will need to add the apprpriate folder to
your path. On a Mac, I needed to add

```
PATH=/Library/PostgreSQL/11/bin:$PATH
```

to my .bash_profile file

## Moving a Postgres Database

Now, to dump the contents of a local postgres database "foodoasis" to a file:

```
pg_dump -d foodoasis -U postgres  -f foodoasis.sql
```

To dump a remote database:

```
pg_dump --dbname foodoasis --host <host> --username foodoasis --file foodoasis.sql --verbose --clean --no-owner --no-privileges --if-exists --password
```

To upload this database to a remote postgres database, first create the remote database, then

```
psql -f foodoasis.sql --host <database host goes here> --port 5432 --username foodoasis --dbname foodoasis
```

To restore the dump to a local database, first create the database and user, then:

```
sudo -u postgres psql --host localhost --username foodoasis --dbname foodoasis --file foodoasis.sql
```

You should be prompted for the remote database password, and then the data should be imported to the remote
database.
There will be errors if using postgres versions other than 11.
