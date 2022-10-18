import { Router } from "express";

const router = Router();
import suggestionController from "../controllers/suggestion-controller";

router.get("/", suggestionController.getAll);
router.get("/:id", suggestionController.getById);
router.post("/", suggestionController.post);
router.put("/:id", suggestionController.put);

module.exports = router;
