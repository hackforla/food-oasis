const router = require("express").Router();
const loadController = require("../controllers/load-controller");

router.get("/lapl-food-resources", loadController.getLaplFoodResources);

module.exports = router;
