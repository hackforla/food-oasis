const router = require("express").Router();
const faqController = require("../controllers/faq-controller");
const jwtSession = require("../../middleware/jwt-session");

router.get("/", faqController.getAll);
router.get("/language/:language", faqController.getAllByLanguage);
router.get("/faq/:id", faqController.getById);
router.get("/identifier/:identifier", faqController.getByIdentifier);
router.post("/", jwtSession.validateUser, faqController.post);
router.put("/faq/:id", jwtSession.validateUser, faqController.put);
router.delete("/", jwtSession.validateUser, faqController.remove);

module.exports = router;
