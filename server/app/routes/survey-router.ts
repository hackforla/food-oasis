import { Router } from "express";
import surveyController from "../controllers/survey-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { SurveyRequestSchema } from "../validation-schema/survey-schema";

const router = Router();

router.get(
  "/admin",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  surveyController.getAdminByTenantId
);

router.get("/", surveyController.getPublicByTenantId);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  requestValidationMiddleware(SurveyRequestSchema),
  surveyController.post
);

router.put(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  requestValidationMiddleware(SurveyRequestSchema),
  surveyController.put
);

export default router;
