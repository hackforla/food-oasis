import { RequestHandler } from "express";
import surveyService from "../services/survey-service";
import {
  SurveyLink,
  Survey,
  AdminSurvey,
  SurveyRequest,
} from "../../types/survey-types";

type ErrorBody = { error: string };

/**
 * getPublicByTenantId:
 * RequestHandler:
 * params
 * resBody
 * reqBody
 * reqQuery
 * locals
 */
const getPublicByTenantId: RequestHandler<
  never,
  Survey | ErrorBody,
  never,
  { tenantId?: string }
> = async (req, res) => {
  const tenantId = Number(req.query.tenantId);

  if (!Number.isInteger(tenantId) || tenantId <= 0)
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

export default { getPublicByTenantId };
