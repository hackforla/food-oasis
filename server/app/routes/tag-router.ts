import { Router } from "express";
import * as tagController from "../controllers/tag-controller";
import jwtSession from "../../middleware/jwt-session";
import {requestValidationMiddleware} from '../../middleware/request-validation-middlewares'
import { tagPutRequestSchema } from "../validation-schema/tag-schema";
import { tagPostRequestSchema } from "../validation-schema/tag-schema";

const router = Router();

router.get("/:tenantId", tagController.getAllByTenantId);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(tagPostRequestSchema),
  tagController.post
);

router.put(
  "/:tagId",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(tagPutRequestSchema),
  tagController.put
);

router.delete(
  "/:tagId",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.remove
);

export default router;
