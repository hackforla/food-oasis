const router = require("express").Router();

const accountRouter = require("./account-router");
const categoryRouter = require("./category-router");
const resourceRouter = require("./resource-router");
const organizationRouter = require("./organization-router");

const faqRouter = require("./faq-router");
const stakeholderRouter = require("./stakeholder-router");
const distanceRouter = require("./distance-router");
const importRouter = require("./import-router");
const loadRouter = require("./load-router");
const esriRouter = require("./esri-router");

const widgetRouter = require("./widget-router");

module.exports = router;

router.use("/api/stakeholders", stakeholderRouter);
router.use("/api/accounts", accountRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/resources", resourceRouter);
router.use("/api/distance", distanceRouter);
router.use("/api/faqs", faqRouter);
router.use("/api/imports", importRouter);
router.use("/api/loads", loadRouter);
router.use("/api/esri", esriRouter);
router.use("/api/organizations", organizationRouter);

router.use("/api/widgets", widgetRouter);
