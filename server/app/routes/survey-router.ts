import { Router } from "express";
import surveyController from '../controllers/survey-controller';
import jwtSession from '../../middleware/jwt-session';
import { requestValidationMiddleware } from '../../middleware/request-validation-middlewares';
import { SurveyRequestSchema } from '../validation-schema/survey-schema';

const router = Router();

router.get(
  "/",
  surveyController.getPublicByTenantId
);

export default router;