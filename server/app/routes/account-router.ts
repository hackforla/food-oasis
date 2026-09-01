import { Router } from "express";
import accountController from "../controllers/account-controller";
import jwtSession from "../../middleware/jwt-session";
import {
  createStrictAuthLimiter,
  createModerateAuthLimiter,
} from "../../middleware/rate-limit";
//const authenticate = require("../../middleware/authenticate");
const router = Router();

router.get(
  "/",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "security_admin",
    "data_entry",
    "global_admin",
  ]),
  accountController.getAll
);

router.post(
  "/register",
  createModerateAuthLimiter(),
  accountController.register
);
router.post(
  "/resendConfirmationEmail",
  createModerateAuthLimiter(),
  accountController.resendConfirmationEmail
);
router.post(
  "/confirmRegister",
  createModerateAuthLimiter(),
  accountController.confirmRegister
);

router.post(
  "/forgotPassword",
  createStrictAuthLimiter(),
  accountController.forgotPassword
);
router.post(
  "/resetPassword",
  createStrictAuthLimiter(),
  accountController.resetPassword
);
router.post(
  "/setPermissions",
  jwtSession.validateUserHasRequiredRoles(["security_admin", "global_admin"]),
  accountController.setTenantPermissions
);
router.post(
  "/setGlobalPermissions",
  jwtSession.validateUserHasRequiredRoles(["global_admin"]),
  accountController.setGlobalPermissions
);

router.post(
  "/login",
  createStrictAuthLimiter(),
  accountController.login,
  jwtSession.login
);
router.get("/logout", (req, res) => {
  // "Delete" cookie by expiring it immediately
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()), // 1 day
  });
  res.sendStatus(200);
});

router.put(
  "/:userid",
  jwtSession.validateUser,
  accountController.updateUserProfile
);

router.get("/:email", accountController.getByEmail);

export default router;
