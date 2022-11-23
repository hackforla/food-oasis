const router = require("express").Router();

const tenantRouter = require("./tenant-router");
const accountRouter = require("./account-router");
const categoryRouter = require("./category-router");
const neighborhoodRouter = require("./neighborhood-router");
const suggestionRouter = require("./suggestion-router");
const parentOrganizationRouter = require("./parent-organization-router");
const tagRouter = require("./tag-router");
const loginsRouter = require("./logins-router");

const faqRouter = require("./faq-router");
const stakeholderRouter = require("./stakeholder-router");
const stakeholderBestRouter = require("./stakeholder-best-router");
const stakeholderLogRouter = require("./stakeholder-log-router");
const importRouter = require("./import-router");
const exportRouter = require("./export-router");
const loadRouter = require("./load-router");
const esriRouter = require("./esri-router");
const emailRouter = require("./email-router");

module.exports = router;

router.use("/api/accounts", accountRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/emails", emailRouter);
router.use("/api/esri", esriRouter);
router.use("/api/export", exportRouter);
router.use("/api/faqs", faqRouter);
router.use("/api/import", importRouter);
router.use("/api/loads", loadRouter);
router.use("/api/logins", loginsRouter);
router.use("/api/neighborhoods", neighborhoodRouter);
router.use("/api/parent-organizations", parentOrganizationRouter);
router.use("/api/stakeholders", stakeholderRouter);
router.use("/api/stakeholderbests", stakeholderBestRouter);
router.use("/api/stakeholderlogs", stakeholderLogRouter);
router.use("/api/suggestions", suggestionRouter);
router.use("/api/tags", tagRouter);
router.use("/api/tenants", tenantRouter);
