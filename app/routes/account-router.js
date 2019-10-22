const router = require("express").Router();
const accountController = require("../controllers/account-controller");
const jwtSession = require("../../middleware/jwt-session");
const authenticate = require("../../middleware/authenticate");

router.get("/", jwtSession.validateUser, accountController.getAll);

router.post("/register", accountController.register);
//router.post("/login", accountController.login);

router.post("/login", authenticate.authenticate, jwtSession.login);

module.exports = router;
