const router = require("express").Router();

const accountRouter = require("./account-router");
const widgetRouter = require("./widget-router");

module.exports = router;

router.use("/api/widgets", widgetRouter);
router.use("/api/accounts", accountRouter);
