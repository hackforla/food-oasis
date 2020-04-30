const { Pool } = require("pg");

// In a production Heroku environment, Heroku will
// set the process.env.DATABASE_URL to point to the
// related database, and change it if/when they move
// the database.
// In a DEV environment, we get the database
// connection parameters from the .env file.
const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.POSTGRES_USERNAME,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
      ssl: { rejectUnauthorized: false },
    };

const pool = new Pool(poolConfig);

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle node-postgres client", err);
  //process.exit(-1)
});

module.exports = {
  pool,
};
