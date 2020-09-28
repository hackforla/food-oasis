const router = require("express").Router();
const suggestionController = require("../controllers/suggestion-controller");
const jwtSession = require("../../middleware/jwt-session");

router.get(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin", "security_admin"]),
  suggestionController.getAll
);

router.get("/:id", jwtSession.validateUser, suggestionController.getById);

router.get(
  "/assigned/:userId",
  jwtSession.validateUser,
  suggestionController.getAllByAssignedUser
);

router.post("/", suggestionController.post);

router.delete(
  "/:id",
  jwtSession.validateUserHasRequiredRoles(["admin", "security_admin"]),
  suggestionController.remove
);

module.exports = router;
