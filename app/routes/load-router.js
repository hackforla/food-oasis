const router = require("express").Router();
const loadController = require("../controllers/load-controller");
const jwtSession = require("../../middleware/jwt-session");

router.get(
  "/lapl-food-resources",
  jwtSession.validateUser,
  loadController.getLaplFoodResources
);

router.get("/load-211", jwtSession.validateUser, loadController.get211);

module.exports = router;
