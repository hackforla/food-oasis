const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const importController = require("../controllers/import-controller");

router.get(
  "/lapl-food-resources",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  importController.getLaplFoodResources
);

module.exports = router;
