const router = require("express").Router();
const loadController = require("../controllers/load-controller");

router.get("/lapl-food-resources", loadController.getLaplFoodResources);

router.get("/load-211", loadController.get211);

module.exports = router;
