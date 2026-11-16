import { RequestHandler } from "express";
import surveyService from "../services/survey-service";
import { Survey, AdminSurvey, SurveyRequest } from "../../types/survey-types";

type ErrorBody = { error: string };

const getPublicByTenantId: RequestHandler<
  never,
  Survey | ErrorBody,
  never,
  { tenantId?: string }
> = async (req, res) => {
  const tenantId = Number(req.query.tenantId);

  if (!Number.isInteger(tenantId) || tenantId <= 0 || tenantId > 2147483647)
    return res.status(400).json({ error: "Valid tenantId is required" });

  try {
    const survey = await surveyService.getPublicByTenantId(tenantId);
    if (!survey) return res.status(204).end();
    res.status(200).json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminByTenantId: RequestHandler<
  never,
  AdminSurvey | ErrorBody,
  never,
  { tenantId?: string }
> = async (req, res) => {
  const tenantId = Number(req.query.tenantId);

  if (!Number.isInteger(tenantId) || tenantId <= 0 || tenantId > 2147483647)
    return res.status(400).json({ error: "Valid tenantId is required" });

  try {
    const adminSurvey = await surveyService.getAdminByTenantId(tenantId);
    if (!adminSurvey) return res.status(204).end();
    res.status(200).json(adminSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const post: RequestHandler<
  never,
  AdminSurvey | ErrorBody,
  SurveyRequest,
  never
> = async (req, res) => {
  const userId = Number(req.user?.id);
  const createRequest = req.body;

  try {
    const adminSurvey = await surveyService.create(
      createRequest,
      Number.isInteger(userId) && userId > 0 ? userId : null
    );
    res.status(201).json(adminSurvey);
  } catch (error: unknown) {
    // 23503 on the tenant foreign key = tenantId does not exist
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503" &&
      "constraint" in error &&
      error.constraint === "fk_survey_tenant"
    ) {
      return res.status(400).json({ error: "Unknown tenant" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const put: RequestHandler<
  never,
  AdminSurvey | ErrorBody,
  SurveyRequest,
  never
> = async (req, res) => {
  const userId = Number(req.user?.id);
  const updateRequest = req.body;

  try {
    const adminSurvey = await surveyService.updateCurrent(
      updateRequest,
      Number.isInteger(userId) && userId > 0 ? userId : null
    );
    if (!adminSurvey)
      return res
        .status(404)
        .json({ error: "No current survey for this tenant" });
    res.status(200).json(adminSurvey);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { getPublicByTenantId, getAdminByTenantId, post, put };
