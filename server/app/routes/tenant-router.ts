import { Router } from "express";
const router = Router();
import tenantController from "../controllers/tenant-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { tenantRequestSchema } from "../validation-schema/tenant-schema";

router.get("/", tenantController.getAll);
router.get("/:id", tenantController.getById);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["global_admin"]),
  requestValidationMiddleware(tenantRequestSchema),
  tenantController.post
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["global_admin"]),
  requestValidationMiddleware(tenantRequestSchema),
  tenantController.put
);
router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["global_admin"]),
  tenantController.remove
);

export default router;
