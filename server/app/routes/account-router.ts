import { Router } from "express";

const router = Router();
import accountController from "../controllers/account-controller";
const jwtSession = require("../../middleware/jwt-session");
//const authenticate = require("../../middleware/authenticate");

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

router.post("/register", accountController.register);
router.post(
  "/resendConfirmationEmail",
  accountController.resendConfirmationEmail
);
router.post("/confirmRegister", accountController.confirmRegister);

router.post("/forgotPassword", accountController.forgotPassword);
router.post("/resetPassword", accountController.resetPassword);
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

router.post("/login/:email?", accountController.login, jwtSession.login);
router.get("/logout", (req, res) => {
  // "Delete" cookie by expiring it immediately
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()), // 1 day
  });
  res.sendStatus(200);
});

module.exports = router;
