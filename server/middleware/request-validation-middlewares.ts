import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats"
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function requestValidationMiddleware<T>(schema: T) {

  const validatingRequest = ajv.compile(schema as object);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validatingRequest(req.body);
    if (!valid) {
      res.sendStatus(400);
    }
    else
      next();
  }
}
