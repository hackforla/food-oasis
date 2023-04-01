import { Request, Response, NextFunction } from "express";
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

// export const validateTenantMiddleware: RequestHandler = (req, res, next) => {

//   const valid = validateTenantRequest(req.body);
//   if (!valid) {
//     console.log(validateTenantRequest.errors);
//     res.sendStatus(400);
//   }
//   else
//     next();
// }


export const requestValidationMiddleware = (schema: any) => {
  
  const validatingRequest = ajv.compile(schema);

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
