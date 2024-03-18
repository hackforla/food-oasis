import db from "./db";
import { Feature } from "../../types/feature-types";

const getAll = async (): Promise<Feature[]> => {
  const sql = `
  SELECT id, name FROM feature_flag
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: Feature): Promise<{ id: number }> => {
  const sql = `
    INSERT INTO feature_flag(name)
    VALUES ($<name>)
    RETURNING id, name
  `;
  const result = await db.one(sql, model);
  return result;
};

export default {
  insert,
  getAll,
};
