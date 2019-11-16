const router = require("express").Router();
const importController = require("../controllers/import-controller");

router.get("/lapl-food-resources", importController.getLaplFoodResources);

module.exports = router;
