import { Router } from "express";
import announcementsController from "../controllers/announcements-controller";
import jwtSession from "../../middleware/jwt-session";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";
import { AnnouncementsPostRequestSchema } from "../validation-schema/announcements-schema";


const router = Router();

router.get("/", announcementsController.getAll);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  requestValidationMiddleware(AnnouncementsPostRequestSchema),
  announcementsController.post
);
router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  announcementsController.remove
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  announcementsController.update
);

export default router;