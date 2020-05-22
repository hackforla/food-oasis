const router = require("express").Router();
const stakeholderController = require("../controllers/stakeholder-controller");

router.get("/", stakeholderController.search);
router.get("/dashboard", stakeholderController.searchDashboard);
router.get("/:id", stakeholderController.getById);
router.post("/", stakeholderController.post);
router.put("/:id", stakeholderController.put);
router.delete("/:id", stakeholderController.remove);
router.put("/:id/needsVerification", stakeholderController.needsVerification);
router.put("/:id/assign", stakeholderController.assign);
router.put("/:id/claim", stakeholderController.claim);

module.exports = router;
