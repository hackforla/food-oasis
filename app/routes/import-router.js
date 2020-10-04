const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const importController = require("../controllers/import-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get(
  "/lapl-food-resources",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  importController.getLaplFoodResources
);

router.post(
  "/stakeholders-csv",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  upload.single("file"),
  importController.loadStakeholderCsv
);

module.exports = router;
