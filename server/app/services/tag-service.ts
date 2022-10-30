const db = require("./db");
import camelcaseKeys from "camelcase-keys";
import { Tag, StakeholderTag } from "../types/tag-types";

const selectAllById = async (tenantId: string) => {
  const id = Number(tenantId);
  const sql = `select id, name, tenant_id
  from stakeholder_tag where tenant_id = $<id>
  order by name`;

  const result: Tag[] = await db.manyOrNone(sql, { id });
  return result.map((r) => camelcaseKeys(r));
};

const insert = async (model: Omit<StakeholderTag, "id">) => {
  model.name = model.name.toUpperCase();
  const sql = `insert into stakeholder_tag (name,  tenant_id)
    values ($<name>,  $<tenantId>)
    returning id`;

  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (body: Tag, tagId: string) => {
  body.name = body.name.toUpperCase();

  const sql = `update stakeholder_tag
               set name = $<name>
                where id = $<id>`;
  await db.none(sql, { ...body, id: Number(tagId) });
};

const remove = async (id: string) => {
  const sql = `delete from stakeholder_tag where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export { selectAllById, insert, update, remove };
