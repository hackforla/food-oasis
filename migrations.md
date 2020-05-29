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
