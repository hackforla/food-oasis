import db from "./db";
import { Feature } from "../../types/feature-types";

const getAll = async (): Promise<Feature[]> => {
  const sql = `
  select id, name from feature_flag
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: Feature): Promise<{ id: number }> => {
  const sql = `
    insert into feature_flag(name)
    values ($<name>)
    returning id, name
  `;
  const result = await db.one(sql, model);
  return result;
};

export default {
  insert,
  getAll,
};
