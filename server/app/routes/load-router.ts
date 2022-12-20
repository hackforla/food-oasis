import express from "express";
import loadController from "../controllers/load-controller";
import jwtSession from "../../middleware/jwt-session";
const router = express.Router();

router.get(
  "/lapl-food-resources",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  loadController.getLaplFoodResources
);

router.get(
  "/open-la",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  loadController.getOpenLA
);

router.get(
  "/larfb",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  loadController.getLARFB
);

router.get(
  "/load-211",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  loadController.get211
);

export default router;
