const router = require("express").Router();
const stakeholderController = require("../controllers/stakeholder-controller");
const jwtSession = require("../../middleware/jwt-session");

router.get("/", stakeholderController.search);
router.get(
  "/dashboard",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.searchDashboard
);
router.get(
  "/:id",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.getById
);

router.post(
  "/csv",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.csv
);

router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  stakeholderController.post
);

router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles([
    "admin",
    "data_entry",
    "coordinator",
  ]),
  stakeholderController.put
);

router.put(
  "/:id/needsVerification",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  stakeholderController.needsVerification
);
router.put(
  "/:id/assign",
  jwtSession.validateUserHasRequiredRoles(["admin", "coordinator"]),
  stakeholderController.assign
);

router.put(
  "/:id/claim",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  stakeholderController.claim
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  stakeholderController.remove
);

module.exports = router;
