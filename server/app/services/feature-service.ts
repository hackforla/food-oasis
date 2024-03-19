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


const remove = async (id: string) => {
  try {
    await db.tx(async (t) => {
      const deleteAssociationsQuery = `
        DELETE FROM feature_to_login
        WHERE feature_id = $<id>
      `;
      await t.none(deleteAssociationsQuery, { id: Number(id) });
      const deleteFeatureQuery = `
        DELETE FROM feature_flag
        WHERE id = $<id>
      `;
      await t.none(deleteFeatureQuery, { id: Number(id) });
    });
    return {
      success: true,
      message: "Feature and associated logins deleted successfully.",
    };
  } catch (error) {
    console.error("Error in remove function:", error);
    throw error;
  }
};

export default {
  insert,
  getAll,
  remove,
};
