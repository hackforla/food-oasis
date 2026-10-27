import { RequestHandler } from "express";
import emailTemplateService from "../services/email-template-service";
import {
  EmailTemplate,
  EmailTemplatePostRequest,
} from "../../types/email-template-types";

type ErrorBody = { error: string };

const getByKey: RequestHandler<
  { key: string },
  EmailTemplate | ErrorBody,
  never,
  { tenantId?: string }
> = async (req, res) => {
  const { key } = req.params;
  if (!emailTemplateService.isKnownKey(key)) {
    return res.status(404).json({ error: "Unknown template key" });
  }
  const tenantId = Number(req.query.tenantId);
  if (!Number.isInteger(tenantId) || tenantId < 1) {
    return res.status(400).json({ error: "tenantId is required" });
  }
  try {
    const template = await emailTemplateService.getByKey(key, tenantId);
    res.status(200).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const post: RequestHandler<
  { key: string },
  EmailTemplate | ErrorBody,
  EmailTemplatePostRequest
> = async (req, res) => {
  const { key } = req.params;
  if (!emailTemplateService.isKnownKey(key)) {
    return res.status(404).json({ error: "Unknown template key" });
  }
  const { tenantId, subject, intro } = req.body;
  const userId = Number(req.user?.id);
  try {
    const template = await emailTemplateService.upsert(
      key,
      tenantId,
      { subject, intro },
      Number.isInteger(userId) && userId > 0 ? userId : null
    );
    res.status(200).json(template);
  } catch (error: unknown) {
    // 23503 on the tenant foreign key = tenantId does not exist
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503" &&
      "constraint" in error &&
      error.constraint === "fk_email_template_tenant"
    ) {
      return res.status(400).json({ error: "Unknown tenant" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { getByKey, post };
