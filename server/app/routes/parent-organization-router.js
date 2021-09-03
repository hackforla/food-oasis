const router = require("express").Router();
const parentOrganizationController = require("../controllers/parent-organization-controller");

const jwtSession = require("../../middleware/jwt-session");

router.get("/:id", parentOrganizationController.getAllByTenantId);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.post
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.put
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  parentOrganizationController.remove
);

module.exports = router;
