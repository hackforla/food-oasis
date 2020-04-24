const router = require("express").Router();
const stakeholderController = require("../controllers/stakeholder-controller");

router.get("/", stakeholderController.search);
router.get("/:id", stakeholderController.getById);
router.post("/", stakeholderController.post);
router.put("/:id", stakeholderController.put);
router.delete("/:id", stakeholderController.remove);
router.put("/:id/verify", stakeholderController.verify);
router.put("/:id/assign", stakeholderController.assign);
router.put("/:id/claim", stakeholderController.claim);
router.put("/:id/approve", stakeholderController.approve);
router.put("/:id/reject", stakeholderController.reject);

module.exports = router;
