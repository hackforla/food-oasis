import { Router } from "express";
const router = Router();
import parentOrganizationController from "../controllers/parent-organization-controller";

import jwtSession from "../../middleware/jwt-session";

router.get("/:tenantId", parentOrganizationController.getAllByTenantId);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.insert
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.update
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.remove
);

module.exports = router;
