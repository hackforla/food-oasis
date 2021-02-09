const router = require("express").Router();
const stakeholderLogController = require("../controllers/stakeholder-log-controller");

router.get("/:id", stakeholderLogController.getById);

module.exports = router;
