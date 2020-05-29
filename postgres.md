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

This will install pgAdmin, a good administration tool which allows you to connect
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

# Migrations

Changes to database are run with the migration package
[`node-pg-migrate`](https://salsita.github.io/node-pg-migrate/#/)

## prerequisites
`node-pg-migrate` uses the connection parameters set in
[./db/config.js](./db/config.js), which are sourced from the `.env` in the root
of the repo. see [.env.sample](.env.sample) for example of this.

## create a new migration
to generate a new migration template called "add-books-table.js" run:

```bash
npm run migrate create add-books-table
```

this will output a migration file called <timestamp>-add-books-table.js in the
[migrations](./migrations) directory that can be filled out with the create
table definition.

Read `node-pg-migrate`
[docs](https://salsita.github.io/node-pg-migrate/#/migrations) for helpful
examples.

## apply the migration to the db
once the migration script is ready apply it to the db with:

```bash
npm run migrate up
```

## rollback the migration
to roll back a migration run:

```bash
npm run migrate down
```

and that will roll back the last migration.
