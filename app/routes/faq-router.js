const router = require("express").Router();
const faqController = require("../controllers/faq-controller");

router.get("/", faqController.getAll);
router.get("/:id", faqController.getById);
router.post("/", faqController.post);
router.put("/:id", faqController.put);
router.delete("/", faqController.remove);

module.exports = router;
