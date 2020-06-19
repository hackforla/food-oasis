const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

const jwtSession = require("../../middleware/jwt-session");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", jwtSession.validateUser, categoryController.post);
router.put("/:id", jwtSession.validateUser, categoryController.put);
router.delete("/:id", jwtSession.validateUser, categoryController.remove);

module.exports = router;
