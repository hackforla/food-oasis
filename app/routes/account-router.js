const router = require("express").Router();
const accountController = require("../controllers/account-controller");
const auth = require("../../middleware/auth");

router.get("/", accountController.getAll);
// router.get("/:id", accountController.getById);
router.post("/register", accountController.register);
router.post("/login", accountController.login);
// router.put("/:id", accountController.put);
// router.delete("/:id", accountController.remove);

module.exports = router;
