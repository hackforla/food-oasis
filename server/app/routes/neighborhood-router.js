const router = require("express").Router();
const neighborhoodController = require("../controllers/neighborhood-controller");

router.get("/", neighborhoodController.getAll);
router.get("/:id", neighborhoodController.getGeoJSONById);

module.exports = router;
