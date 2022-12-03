import { ParentOrganization } from "../../types/parent-organization-types";
import db from "./db";
const camelcaseKeys = require("camelcase-keys");

const selectAllById = async (tenantId: string) => {
  const id = Number(tenantId);
  const sql = `select id, name, code, tenant_id
  from parent_organization where tenant_id = $<id>`;

  const result: ParentOrganization[] = await db.manyOrNone(sql, { id });
  return result.map((r) => camelcaseKeys(r));
};

const insert = async (data: Omit<ParentOrganization, "id">) => {
  const parentOrgSql = `select name from parent_organization where name = $<name>;`;
  const parentOrgs = await db.manyOrNone(parentOrgSql, {
    name: data.name,
  });

  if (parentOrgs.length > 0) {
    throw new Error("Cannot insert duplicate row.");
  }

  const sql = `insert into parent_organization (name, code, tenant_id)
    values ($<name>, $<code>, $<tenantId>)
    returning id`;

  const result = await db.one(sql, data);
  return { id: result.id };
};

const update = async (data: ParentOrganization) => {
  const sql = `update parent_organization
               set name = $<name>, code = $<code>
                where id = $<id>`;
  await db.none(sql, data);
};

const remove = async (id: string) => {
  const sql = `delete from parent_organization where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export default {
  selectAllById,
  insert,
  update,
  remove,
};
