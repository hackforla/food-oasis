const router = require("express").Router();
const stakeholderController = require("../controllers/stakeholder-controller");

router.get("/", stakeholderController.getAll);
router.get("/:id", stakeholderController.getById);
router.post("/", stakeholderController.post);
router.put("/:id", stakeholderController.put);
router.delete("/:id", stakeholderController.remove);

module.exports = router;
