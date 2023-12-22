import { Router } from "express";

import tenantRouter from "./tenant-router";
import accountRouter from "./account-router";
import categoryRouter from "./category-router";
import neighborhoodRouter from "./neighborhood-router";
import suggestionRouter from "./suggestion-router";
import parentOrganizationRouter from "./parent-organization-router";
import tagRouter from "./tag-router";
import loginsRouter from "./logins-router";
import faqRouter from "./faq-router";
import stakeholderRouter from "./stakeholder-router";
import stakeholderBestRouter from "./stakeholder-best-router";
import stakeholderLogRouter from "./stakeholder-log-router";
import importRouter from "./import-router";
import exportRouter from "./export-router";
import loadRouter from "./load-router";
import emailRouter from "./email-router";
import awsRouter from "./aws-router";

const router = Router();

router.use("/api/accounts", accountRouter);
router.use("/api/aws", awsRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/emails", emailRouter);
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
router.use("/api/logins", loginsRouter);

export default router;
