const router = require("express").Router();
const emailController = require("../controllers/email-controller");

router.post("/", emailController.send);

module.exports = router;
