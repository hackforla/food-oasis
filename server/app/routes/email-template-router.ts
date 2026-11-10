import { Router } from "express";
import emailTemplateController from "../controllers/email-template-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { EmailTemplatePostRequestSchema } from "../validation-schema/email-template-schema";

const router = Router();

router.get(
  "/:key",
  jwtSession.validateUserHasRequiredRoles([
    "data_entry",
    "coordinator",
    "admin",
  ]),
  emailTemplateController.getByKey
);
router.post(
  "/:key",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  requestValidationMiddleware(EmailTemplatePostRequestSchema),
  emailTemplateController.post
);

export default router;
