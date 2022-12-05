import express from "express";
import stakeholderLogController from "../controllers/stakeholder-log-controller";
const router = express.Router();

router.get("/:id", stakeholderLogController.getById);

export default router;
