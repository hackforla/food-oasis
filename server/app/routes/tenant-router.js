const router = require("express").Router();
const tenantController = require("../controllers/tenant-controller");

router.get("/", tenantController.getAll);
router.get("/:id", tenantController.getById);
router.post("/", tenantController.post);
router.put("/:id", tenantController.put);
router.delete("/:id", tenantController.remove);

module.exports = router;
