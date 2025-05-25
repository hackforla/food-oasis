import { Router } from "express";
import loginsController from "../controllers/logins-controller";
import jwtSession from "../../middleware/jwt-session";
const router = Router();

router.get(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  loginsController.getAll
);

export default router;
