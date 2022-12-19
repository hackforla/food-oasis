const router = require("express").Router();
const loadController = require("../controllers/load-controller");
const jwtSession = require("../../middleware/jwt-session");

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

module.exports = router;
