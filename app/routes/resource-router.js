const router = require("express").Router();
const controller = require("../controllers/resource-controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.createResource);
router.put("/:id", controller.updateResource);
router.delete("/:id", controller.deleteResource);

module.exports = router;
