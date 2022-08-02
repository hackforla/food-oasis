import db from "./db";
import camelcaseKeys from "camelcase-keys";

const selectAll = async (params: {
  statusIds: number[];
  tenantId: number[];
}) => {
  const statusIds = params.statusIds
    ? params.statusIds.map((s) => Number(s)).join(",")
    : "-1";
  const sql = `
    select id, name, address_1, address_2, city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, suggestion_status_id, admin_notes, tenant_id
    from suggestion
    where suggestion_status_id in (${statusIds})
    and tenant_id = $<tenantId>
    order by created_date
  `;
  const result = await db.manyOrNone(sql, {
    tenantId: Number(params.tenantId),
  });
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (suggestionId: number) => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(suggestionId);
  const sql = `
    select id, name, address_1, address_2, city, state, zip,
    phone, email, notes,
    tipster_name, tipster_phone, tipster_email,
    hours, category, suggestion_status_id, admin_notes, tenant_id
    from suggestion where id = $<id>`;

  const row = await db.one(sql, { id });
  return camelcaseKeys(row);
};

const insert = async (model) => {
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

const update = async (model: object) => {
  const sql = `update suggestion set
    admin_notes = $<adminNotes>,
    suggestion_status_id = $<suggestionStatusId>
  where id = $<id>`;
  await db.none(sql, model);
};

const remove = async (id) => {
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
