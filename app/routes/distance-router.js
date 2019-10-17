const router = require("express").Router();
const distanceController = require("../controllers/distance-controller");

router.get("/", distanceController.getDistances);

module.exports = router;