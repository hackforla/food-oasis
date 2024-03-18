import { Router } from "express";
import featureToLoginController from "../controllers/feature-to-login-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { FeatureToLoginPostRequestSchema } from "../validation-schema/feature-to-login-schema";

const router = Router();

router.get("/", featureToLoginController.getLoginsByFeature);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(FeatureToLoginPostRequestSchema),
  featureToLoginController.post
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  featureToLoginController.remove
);

export default router;
