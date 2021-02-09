const router = require("express").Router();
const tenantController = require("../controllers/tenant-controller");

router.get("/", tenantController.getAll);

module.exports = router;
