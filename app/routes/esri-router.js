const router = require("express").Router();
const esriController = require("../controllers/esri-controller");

router.get("/geocode", esriController.geocode);

module.exports = router;
