const router = require("express").Router();
const widgetController = require("../controllers/widget-controller");

router.get("/", widgetController.getAll);
router.get("/:id", widgetController.getById);
router.post("/", widgetController.post);
router.put("/:id", widgetController.put);
router.delete("/:id", widgetController.remove);

module.exports = router;
