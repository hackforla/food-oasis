import db from "./db";
import camelcaseKeys from "camelcase-keys";
import { Suggestion } from "../../types/suggestion-types";

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
    hours, category, suggestion_status_id, admin_notes, tenant_id
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
    hours, category, suggestion_status_id, admin_notes, tenant_id
    from suggestion where id = $<id>`;

  const row: Suggestion = await db.one(sql, { id });

  return camelcaseKeys(row);
};

const insert = async (model: Suggestion): Promise<{ id: number }> => {
  model.suggestionStatusId = 1;
  const sql = `insert into suggestion (
    name, address_1, address_2,
    city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, tenant_id
  ) values (
    $<name>, $<address1>, $<address2>,
    $<city>, $<state>, $<zip>,
    $<phone>, $<email>,  $<notes>,
    $<tipsterName>, $<tipsterPhone>, $<tipsterEmail>,
    $<hours>, $<category>, $<tenantId>
  )
  returning id`;
  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (model: Suggestion) => {
  const sql = `update suggestion set
    admin_notes = $<adminNotes>,
    suggestion_status_id = $<suggestionStatusId>
  where id = $<id>`;
  await db.none(sql, model);
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
  insert,
  update,
  remove,
};
