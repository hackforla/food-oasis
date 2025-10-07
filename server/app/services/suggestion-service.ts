import db from "./db";
import camelcaseKeys from "camelcase-keys";
import { Suggestion } from "../../types/suggestion-types";
import { SuggestionPostFields } from "../validation-schema/suggestion-schema";

const selectAll = async (params: {
  statusIds: string[];
  tenantId: string;
}): Promise<Suggestion[]> => {
  const statusIds = params.statusIds
    ? params.statusIds.map((s) => [Number(s)])
    : [];

  const sql = `
    select id, name, address_1, address_2, city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, suggestion_status_id, admin_notes, tenant_id, form_type
    from suggestion
    where suggestion_status_id = any ($<statusIds>)
    and tenant_id = $<tenantId>
    order by created_date
  `;
  const result: Suggestion[] = await db.manyOrNone(sql, {
    tenantId: Number(params.tenantId),
    statusIds: statusIds,
  });
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (suggestionId: string): Promise<Suggestion> => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(suggestionId);
  const sql = `
    select id, name, address_1, address_2, city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, suggestion_status_id, admin_notes, tenant_id, form_type
    from suggestion where id = $<id>`;

  const row: Suggestion = await db.one(sql, { id });

  return camelcaseKeys(row);
};

const selectByStakeholderId = async (
  stakeholderId: string
): Promise<Suggestion[]> => {
  const id = Number(stakeholderId);
  const sql = `
    select id, name, address_1, address_2, city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, suggestion_status_id, admin_notes, tenant_id, form_type, created_date
    from suggestion where stakeholder_id = $<id>`;

  const rows: Suggestion[] = await db.manyOrNone(sql, { id });

  return camelcaseKeys(rows);
};

const insert = async (model: SuggestionPostFields): Promise<{ id: number }> => {
  const sql = `insert into suggestion (
    name, address_1, address_2,
    city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, tenant_id, stakeholder_id, form_type
  ) values (
    $<name>, $<address1>, $<address2>,
    $<city>, $<state>, $<zip>,
    $<phone>, $<email>,  $<notes>,
    $<tipsterName>, $<tipsterPhone>, $<tipsterEmail>,
    $<hours>, $<category>, $<tenantId>, $<stakeholderId>, $<formType>
  )
  returning id`;
  const result = await db.one(sql, { ...model, suggestionStatusId: 1 });
  return { id: result.id };
};

const update = async (id: string, model: Partial<Suggestion>) => {
  const fields = [];
  const params: Partial<Suggestion> = { id: Number(id) };

  if (model.adminNotes !== undefined) {
    fields.push("admin_notes = $<adminNotes>");
    params.adminNotes = model.adminNotes;
  }
  if (model.suggestionStatusId !== undefined) {
    fields.push("suggestion_status_id = $<suggestionStatusId>");
    params.suggestionStatusId = model.suggestionStatusId;
  }

  if (fields.length === 0) return;

  const sql = `update suggestion set ${fields.join(", ")} where id = $<id>`;
  await db.none(sql, params);
};

const remove = async (id: string) => {
  const sql = `
    delete from suggestion
    where id = $<id>;`;

  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export default {
  selectAll,
  selectById,
  selectByStakeholderId,
  insert,
  update,
  remove,
};
