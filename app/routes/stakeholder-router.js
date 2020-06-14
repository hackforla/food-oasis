const router = require("express").Router();
const stakeholderController = require("../controllers/stakeholder-controller");
const jwtSession = require("../../middleware/jwt-session");

router.get("/", jwtSession.validateUser, stakeholderController.search);
router.get(
  "/dashboard",
  jwtSession.validateUser,
  stakeholderController.searchDashboard
);
router.get("/:id", jwtSession.validateUser, stakeholderController.getById);
router.post("/csv", jwtSession.validateUser, stakeholderController.csv);
router.post("/", jwtSession.validateUser, stakeholderController.post);
router.put("/:id", jwtSession.validateUser, stakeholderController.put);
router.delete("/:id", jwtSession.validateUser, stakeholderController.remove);
router.put(
  "/:id/needsVerification",
  jwtSession.validateUser,
  stakeholderController.needsVerification
);
router.put(
  "/:id/assign",
  jwtSession.validateUser,
  stakeholderController.assign
);
router.put("/:id/claim", jwtSession.validateUser, stakeholderController.claim);

module.exports = router;
