import { Router } from "express";
const router = Router();
import jwtSession from "../../middleware/jwt-session";
import importController from "../controllers/import-controller";
import multer from "multer";

// memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/lapl-food-resources",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  importController.getLaplFoodResources
);

router.post(
  "/stakeholders-csv",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  upload.single("file"),
  importController.uploadStakeholderCsv
);

router.post(
  "/stakeholders-csv/import",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  importController.importStakeholderCsv
);

export default router;
