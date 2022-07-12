const pinoLogger = require("express-pino-logger");
const pinoNoir = require("pino-noir");

function cors(req, res, next): void {
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );

  next();
}

function handleError(err, req, res, next) {
  console.log("server error", err);
  if (res.headerSent) return next(err);
  res.status(500).json({ error: "Internal Error" });
}

function notFound(req, res) {
  res.status(404).json({ error: `${req.url} Not Found` });
}

function logger() {
  return pinoLogger({
    serializers: pinoNoir([
      "res.headers.set-cookie",
      "req.headers.cookie",
      "req.headers.authorization",
    ]),
  });
}

module.exports = {
  cors,
  handleError,
  notFound,
  logger: logger(),
};
