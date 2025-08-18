import { Router } from "express";
const router = Router();
import parentOrganizationController from "../controllers/parent-organization-controller";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { ParentOrganizationPostRequestSchema } from "../validation-schema/parent-organization-schema";
import { ParentOrganizationPutRequestSchema } from "../validation-schema/parent-organization-schema";

import jwtSession from "../../middleware/jwt-session";

router.get("/:tenantId", parentOrganizationController.getAllByTenantId);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(ParentOrganizationPostRequestSchema),
  parentOrganizationController.insert
);

router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(ParentOrganizationPutRequestSchema),
  parentOrganizationController.update
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.remove
);

export default router;
