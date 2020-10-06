const router = require("express").Router();
const stakeholderBestController = require("../controllers/stakeholder-best-controller");

router.get("/", stakeholderBestController.search);
router.get("/:id", stakeholderBestController.getById);

module.exports = router;
