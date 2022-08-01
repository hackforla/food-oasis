import { Router } from "express";

const router = Router();

import categoryController from "../controllers/category-controller";
import jwtSession from "../../middleware/jwt-session";

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.post
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.put
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  categoryController.remove
);

export default router;
