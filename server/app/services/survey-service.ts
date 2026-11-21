import db from "./db";
import camelcaseKeys from "camelcase-keys";
import { Survey, AdminSurvey, SurveyRequest } from "../../types/survey-types";

const getPublicByTenantId = async (
  tenantId: number
): Promise<Survey | null> => {
  // NOTE: never add updated_by to select for the public get
  const sql = `
    select
      id,
      tenant_id,
      time_to_prompt_seconds,
      where_to_prompt,
      title,
      prompt,
      links,
      is_enabled,
      created_at,
      updated_at
    from survey
    where tenant_id = $<tenantId>
    order by id desc
    limit 1
  `;
  const row = await db.oneOrNone<Survey>(sql, { tenantId });
  if (!row) return null;

  const survey = camelcaseKeys(row);
  return survey.isEnabled ? survey : null;
};

const getAdminByTenantId = async (
  tenantId: number
): Promise<AdminSurvey | null> => {
  const sql = `
    select
      s.id,
      s.tenant_id,
      s.time_to_prompt_seconds,
      s.where_to_prompt,
      s.title,
      s.prompt,
      s.links,
      s.is_enabled,
      s.created_at,
      s.updated_at,
      nullif(concat_ws(' ', l.first_name, l.last_name), '') as updated_by_name
    from survey s
    left join login l on l.id = s.updated_by
    where s.tenant_id = $<tenantId>
    order by s.id desc
    limit 1
  `;
  const row = await db.oneOrNone<AdminSurvey>(sql, { tenantId });
  if (!row) return null;

  const survey = camelcaseKeys(row);
  return survey;
};

const create = async (
  request: SurveyRequest,
  updatedBy: number | null
): Promise<AdminSurvey> => {
  const sql = `
    with saved as (
      insert into survey (
        tenant_id,
        time_to_prompt_seconds,
        where_to_prompt,
        title,
        prompt,
        links,
        is_enabled,
        updated_by
      )
      values (
        $<tenantId>,
        $<timeToPromptSeconds>,
        $<whereToPrompt>,
        $<title>,
        $<prompt>,
        $<links:json>,
        $<isEnabled>,
        (select id from login where id = $<updatedBy>)
      )
      returning *
    )
    select
      s.id,
      s.tenant_id,
      s.time_to_prompt_seconds,
      s.where_to_prompt,
      s.title,
      s.prompt,
      s.links,
      s.is_enabled,
      s.created_at,
      s.updated_at,
      nullif(concat_ws(' ', l.first_name, l.last_name), '') as updated_by_name
    from saved s
    left join login l on l.id = s.updated_by
  `;
  const row = await db.one<AdminSurvey>(sql, { ...request, updatedBy });

  const survey = camelcaseKeys(row);
  return survey;
};

const updateCurrent = async (
  request: SurveyRequest,
  updatedBy: number | null
): Promise<AdminSurvey | null> => {
  const sql = `
    with saved as (
      update survey set
        time_to_prompt_seconds = $<timeToPromptSeconds>,
        where_to_prompt = $<whereToPrompt>,
        title = $<title>,
        prompt = $<prompt>,
        links = $<links:json>,
        is_enabled = $<isEnabled>,
        updated_at = now(),
        updated_by = (select id from login where id = $<updatedBy>)
      where tenant_id = $<tenantId>
        and id = (
          select id
          from survey
          where tenant_id = $<tenantId>
          order by id desc
          limit 1
        )
      returning *
    )
    select
      s.id,
      s.tenant_id,
      s.time_to_prompt_seconds,
      s.where_to_prompt,
      s.title,
      s.prompt,
      s.links,
      s.is_enabled,
      s.created_at,
      s.updated_at,
      nullif(concat_ws(' ', l.first_name, l.last_name), '') as updated_by_name
    from saved s
    left join login l on l.id = s.updated_by
  `;
  const row = await db.oneOrNone<AdminSurvey>(sql, { ...request, updatedBy });
  if (!row) return null;

  const survey = camelcaseKeys(row);
  return survey;
};

export default {
  getPublicByTenantId,
  getAdminByTenantId,
  create,
  updateCurrent,
};
