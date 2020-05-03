const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.post);
router.put("/:id", categoryController.put);
router.delete("/:id", categoryController.remove);

module.exports = router;
