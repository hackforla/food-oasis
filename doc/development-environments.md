# Development Environments

## Native Development Environment

We'll call the first option the _Native Development Environment_, since it runs on your native operating system. This is probably the simplest way to start, since it involves a minimum amount of setup and allows you to work with only with your native operating system (Windows, IOS, or Linux). It is what we recommend if you are just gettting started and do not need to make changes to the database.

## Local Database Environment

If an issue you are working on involves changes to the database structure (e.g., table or stored procedure changes, or changing reference data in the database), you should create a copy of the development database on your machine to try out your changes to

- avoid accidentally corrupting the shared development database
- avoid database changes that would interfere with other developers' work
- allow you to develop the database migration scripts you will need to effect your changes to the development database safely.
- if you accidentally make a change that corrupts your local database, you can easily restore a fresh copy from the shared development database to recover.

This involves installing Postgres on your machine, loading a copy of the development database and running database migrations to bring the local database up to date.

There are two ways to do this:

- Install Postgres on your machine, or
- Run a Postgres docker container on a local docker daemon.

Then you can import a copy of the development database using CLI tools and run migrations to update with recent database changes.
Either way, you end up with a local copy of the database, and can change the .env file credentials to point to the local copy of the database, and run your client and server code as you would for the Native Development Environment.

## Docker Environment

If you want to make sure that your development environment exactly reflects the deployed environments (e.g. production), the best way is to use a multi-container docker environment to replicate the deployment architecture.

[Need more instructions here]
