// Instantiate and Export a Database object, db

// Loading and initializing the library:
const pgp = require("pg-promise")({
  // Initialization Options
});

// Preparing the connection details:
// In a production Heroku environment, Heroku will
// set the process.env.DATABASE_URL to point to the
// related database, and change it if/when they move
// the database.
// In other environments, we get the database
// connection parameters from the .env file.
const cn = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : process.env.POSTGRES_SSL === "false"
  ? {
      user: process.env.POSTGRES_USERNAME,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    }
  : {
      user: process.env.POSTGRES_USERNAME,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    };

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;
