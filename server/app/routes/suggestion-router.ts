import { Router } from "express";

const router = Router();
import suggestionController from "../controllers/suggestion-controller";
import {
  suggestionPutRequestSchema,
  suggestionPostRequestSchema,
} from "../validation-schema/suggestion-schema";
import { requestValidationMiddleware } from "../../middleware/request-validation-middlewares";

router.get("/", suggestionController.getAll);
router.get("/:id", suggestionController.getById);
router.get("/stakeholder/:id", suggestionController.getByStakeholderId);
router.post(
  "/",
  requestValidationMiddleware(suggestionPostRequestSchema),
  suggestionController.post
);
router.put(
  "/:id",
  requestValidationMiddleware(suggestionPutRequestSchema),
  suggestionController.put
);

export default router;
