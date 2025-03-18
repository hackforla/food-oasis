import { Router } from "express";
import localNotificationsController from "../controllers/localNotifications-controller";

const router = Router();

router.get("/", localNotificationsController.getAll);
router.post("/", localNotificationsController.post);
router.delete("/:id", localNotificationsController.remove);
router.put("/:id", localNotificationsController.update);

export default router;