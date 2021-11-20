const router = require("express").Router();
const loginsController = require("../controllers/logins-controller");

router.get("/", loginsController.getAll);

module.exports = router;
