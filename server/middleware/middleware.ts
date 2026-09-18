import { RequestHandler, Request, Response } from "express";

// Comma-separated list of allowed frontend origins, loaded from env.
// See server/.env.example for the expected format.
const ALLOWED_ORIGINS = new Set(
  (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean)
);

const cors: RequestHandler = (req, res, next): void => {
  const origin = req.headers.origin;

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin"); // prevent shared-cache poisoning across origins
  }
  // If origin is missing or not in the allowlist, do NOT set
  // Access-Control-Allow-Origin at all. The browser will then
  // block the calling page from reading the response itself.

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
};

function handleError(err: any, req: Request, res: Response, next: any) {
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal Error" });
}

function notFound(req: Request, res: Response) {
  res.status(404).json({ error: `${req.url} Not Found` });
}

export default {
  cors,
  handleError,
  notFound,
};
