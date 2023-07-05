import { Router } from "express";
import stakeholderController from "../controllers/stakeholder-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { stakeholderRequestSchema } from "../validation-schema/stakeholder-schema";
const router = Router();

router.get(
  "/",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.search
);

router.get(
  "/:id",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.getById
);

router.post(
  "/csv",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.csv
);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  requestValidationMiddleware(stakeholderRequestSchema),
  stakeholderController.post
);

router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  requestValidationMiddleware(stakeholderRequestSchema),
  stakeholderController.put
);

router.put(
  "/:id/needsVerification",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  stakeholderController.needsVerification
);
router.put(
  "/:id/assign",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  stakeholderController.assign
);

router.post(
  "/requestAssignment",
  jwtSession.validateUserHasRequiredRoles(["data_entry"]),
  stakeholderController.requestAssignment
);

router.put(
  "/:id/claim",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  stakeholderController.claim
);

router.delete(
  "/:id",
  //jwtSession.validateUserHasRequiredRoles(["admin"]),
  stakeholderController.remove
);

export default router;
