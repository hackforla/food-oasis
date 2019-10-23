const router = require("express").Router();

const accountRouter = require("./account-router");
const categoryRouter = require("./category-router");
const stakeholderRouter = require("./stakeholder-router");
const distanceRouter = require("./distance-router")

const widgetRouter = require("./widget-router");

module.exports = router;

router.use("/api/stakeholders", stakeholderRouter);
router.use("/api/accounts", accountRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/distance", distanceRouter);

router.use("/api/widgets", widgetRouter);
