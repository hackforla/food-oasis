/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// read all values in .env file and export to environment
// This file is used by the migrate script to connect to the database
// to perform migrations.
require("dotenv").config();

module.exports = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
};
