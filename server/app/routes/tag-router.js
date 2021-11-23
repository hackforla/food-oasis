const router = require("express").Router();
const tagController = require("../controllers/tag-controller");

const jwtSession = require("../../middleware/jwt-session");

router.get("/:id", tagController.getAllByTenantId);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.post
);
router.put(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.put
);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.remove
);

module.exports = router;
