const router = require("express").Router();
const controller = require("../controllers/organization-controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.createOrganization);
router.put("/:id", controller.updateOrganization);
router.delete("/:id", controller.deleteOrganization);

module.exports = router;
