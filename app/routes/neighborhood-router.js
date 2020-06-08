const router = require("express").Router();
const categoryController = require("../controllers/neighborhood-controller");

router.get("/", categoryController.getAll);

module.exports = router;
