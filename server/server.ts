import express from "express";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import middleware from "./middleware/middleware";
import router from "./app/routes/index";

import { Express } from "express";

const app: Express = express();

// Enable compression
app.use(compression());

// Redirect HTTP requests to HTTPS
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    // This way of detecting insecure requests is specific
    // to a Heroku deployment. May need modification for
    // other production deployment platforms.
    if (req.header("x-forwarded-proto") !== "https")
      // redirect to https with same host & url
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

app.use(middleware.cors);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.use(bodyParser.json({ limit: "500kb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500kb",
    extended: true,
  })
);
app.use(cookieParser());

app.use(router);

// The following three routes are for testing purposes, and may be deleted later.
app.get("/hello/:name", (req, res) => {
  res.status(200).json({ hello: req.params.name });
});

app.get("/throw", (req, res, next) => {
  next(new Error("Ouch!"));
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

// In a deployed environment, the client code is served
// as static files associated with the /client/build/index.html
// page, so requests that don't match any of the above are
// assumed to be for react pages.
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.use(middleware.notFound);
app.use(middleware.handleError);

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(`The Web API server is ready to serve requests.`)
);

module.exports = app;
