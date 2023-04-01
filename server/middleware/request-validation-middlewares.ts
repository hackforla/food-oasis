import { RequestHandler } from "express";
import Ajv from 'ajv';
import { tenantRequestSchema } from '../app/request-validation-schema';

const ajv = new Ajv({allErrors: true});

const validateTenantRequest = ajv.compile(tenantRequestSchema);
export const validateTenantMiddleware: RequestHandler = (req, res, next) => {

  const valid = validateTenantRequest(req.body);
  if (!valid) {
    console.log(validateTenantRequest.errors);
    res.sendStatus(400);
  }
  else
    next();
}
