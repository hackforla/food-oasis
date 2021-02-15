const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const exportController = require("../controllers/export-controller");

router.get(
  "/csv-template",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  exportController.downloadFile
);

module.exports = router;
