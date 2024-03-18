import { Router } from "express";
import featureController from "../controllers/feature-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { FeaturePostRequestSchema } from "../validation-schema/feature-schema";

const router = Router();

router.get("/", featureController.getAll);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(FeaturePostRequestSchema),
  featureController.post
);

export default router;
