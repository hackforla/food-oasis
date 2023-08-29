import { Router } from "express";
import stakeholderBestController from "../controllers/stakeholder-best-controller";
const router = Router();

router.get("/", stakeholderBestController.search);
router.get("/select-all", stakeholderBestController.selectAll);
router.get("/:id", stakeholderBestController.getById);

export default router;
