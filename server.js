"use strict";
const express = require("express");
const dotenv = require("dotenv");
const massive = require("massive");

dotenv.config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const middleware = require("./middleware/middleware");
const router = require("./app/routes/index");

const app = express();
app.use(middleware.cors);
// app.use(middleware.logger);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to DB using massive
massive(
  process.env.DATABASE_URL || {
    poolSize: 10,
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    ssl: { rejectUnauthorized: false },
    // ssl: process.env.POSTGRES_SSL === "true",
  }
)
  .then((database) => {
    app.set("db", database);
    console.log("database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(router);

// The following three routes are for testing purposes, and may be deleted later.
app.get("/hello/:name", (req, res) => {
  res.status(200).json({ hello: req.params.name });
});

app.get("/throw", (req, res, next) => {
  next(new Error("Ouch!"));
  //throw new Error("Test Exception Handler");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use(middleware.notFound);
app.use(middleware.handleError);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
