import { RequestHandler, Request, Response } from "express";

const cors: RequestHandler = (req, res, next): void => {
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
