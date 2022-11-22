import { Router } from "express";
const router = Router();
import exportController from "../controllers/export-controller";
import jwtSession from "../../middleware/jwt-session";

router.get(
  "/csv-template",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  exportController.downloadFile
);

module.exports = router;
