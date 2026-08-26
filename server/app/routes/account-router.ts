import { Router } from "express";
import accountController from "../controllers/account-controller";
import jwtSession from "../../middleware/jwt-session";
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

router.post("/login", accountController.login, jwtSession.login);
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

// Requires an authenticated staff role. Previously this was public, which let
// any anonymous caller enumerate which emails have accounts (200 vs 404) and
// harvest the account id, name, confirmation status and creation date for any
// known email (security audit finding #10). The only legitimate caller is the
// admin Features screen (isAdmin), which sends the jwt cookie automatically;
// the role set mirrors GET "/" (which already exposes strictly more account
// data to the same roles).
router.get(
  "/:email",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "security_admin",
    "data_entry",
    "global_admin",
  ]),
  accountController.getByEmail
);

export default router;
