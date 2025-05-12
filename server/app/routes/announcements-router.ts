import { Router } from "express";
import announcementsController from "../controllers/announcements-controller";

const router = Router();

router.get("/", announcementsController.getAll);
router.post("/", announcementsController.post);
router.delete("/:id", announcementsController.remove);
router.put("/:id", announcementsController.update);

export default router;