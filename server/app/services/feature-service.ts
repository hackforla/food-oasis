import db from "./db";
import { Feature } from "../../types/feature-types";

const getAll = async (): Promise<Feature[]> => {
  const sql = `
  SELECT id, name, is_enabled 
  FROM feature_flag
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: Feature): Promise<Feature> => {
  const sql = `
    INSERT INTO feature_flag(name, is_enabled)
    VALUES ($<name>, $<is_enabled>)
    RETURNING id, name, is_enabled
  `;
  const result = await db.one(sql, { ...model, is_enabled: false });
  return result;
};

const remove = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
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

const update = async (id: number, is_enabled: boolean): Promise<Feature> => {
  const sql = `
    UPDATE feature_flag
    SET is_enabled = $<is_enabled>
    WHERE id = $<id>
    RETURNING id, name, is_enabled
`;
  const result = await db.one(sql, { id, is_enabled });
  return result;
};

export default {
  insert,
  getAll,
  remove,
  update,
};
