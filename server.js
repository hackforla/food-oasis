"use strict";
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const middleware = require("./middleware/middleware");
const router = require("./app/routes/index");
const auth = require("./middleware/auth");

const app = express();
app.use(middleware.cors);
app.use(middleware.logger);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Unauthenticated routes
app.use(router);

// The follow three routes are for testing purposes, and may be deleted later.
app.get("/hello/:name", auth.ensureUser, (req, res) => {
  res.status(200).json({ hello: req.params.name });
});

app.get("/throw", (req, res, next) => {
  next(new Error("Ouch!"));
  //throw new Error("Test Exception Handler");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Authenticated routes go after here

app.use(middleware.notFound);
app.use(middleware.handleError);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
