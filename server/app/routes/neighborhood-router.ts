const router = require("express").Router();
const neighborhoodController = require("../controllers/neighborhood-controller");

router.get("/", neighborhoodController.getAll);
router.get("/:ncId", neighborhoodController.getGeoJSONById);
// Endpoint is not used yet, but will be used by an admin screen for adjusting default zoom level of neighborhood
router.put("/:ncId", neighborhoodController.updateZoom);

module.exports = router;
