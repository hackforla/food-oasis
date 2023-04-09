import { Request, Response, NextFunction } from "express";
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

export function requestValidationMiddleware<T>(schema: T) {

  const validatingRequest = ajv.compile(schema as object);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validatingRequest(req.body);
    if (!valid) {
      console.log(validatingRequest.errors);
      res.sendStatus(400);
    }
    else
      next();
  }
}
