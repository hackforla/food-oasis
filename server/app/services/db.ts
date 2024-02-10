// https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise
import pgLib from "pg-promise";

const pgp = pgLib(/* initialization options */);

// generic singleton creator:
export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

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
      ssl: { rejectUnauthorized: false },
      /* See Release Notes for node-postgfres v8 https://node-postgres.com/guides/upgrading */
    };

interface IDatabaseScope {
  db: pgLib.IDatabase<any>;
  pgp: pgLib.IMain;
}

export function getDB(): IDatabaseScope | number {
  try {
    return createSingleton<IDatabaseScope>("food-oasis", () => {
      return {
        db: pgp(cn),
        pgp,
      };
    });
  } catch (err) {
    console.log(err);
    return 0;
  }
}
// Creating a new database instance from the connection details:
const { db } = getDB();

// Exporting the database object for shared use:
export default db;
