import { FeatureToLogin } from "../../types/feature-to-login-types";
import db from "./db";

const getLoginsByFeature = async () => {
  const sql = `
    SELECT u.id as login_id, u.first_name, u.last_name, u.email, ff.name as feature_name, ff.id as feature_id, ftl.id as ftl_id
    FROM feature_flag ff 
    LEFT JOIN feature_to_login ftl ON ff.id = ftl.feature_id
    LEFT JOIN login u ON u.id = ftl.login_id
    ORDER BY ff.id DESC;
  `;
  const results = await db.manyOrNone(sql);
  const groupedByFeature = results.reduce((acc, item) => {
    if (!acc.has(item.feature_id)) {
      acc.set(item.feature_id, {
        ftl_id: item.ftl_id,
        feature_id: item.feature_id,
        feature_name: item.feature_name,
        users: [],
      });
    }

    const feature = acc.get(item.feature_id);
    if (item.login_id) {
      feature.users.push({
        login_id: item.login_id,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
      
      });
    }

    return acc;
  }, new Map());
  const orderedFeatures: FeatureToLogin[] = Array.from(
    groupedByFeature.values()
  );
  console.log(orderedFeatures);
  return orderedFeatures;
};

const insert = async (
  model: FeatureToLogin
): Promise<{
  id: number;
  feature_id: number;
  login_id: number;
}> => {
  try {
    const existingAssociation = await db.oneOrNone(
      `SELECT 1 FROM feature_to_login WHERE feature_id = $<feature_id> AND login_id = $<login_id>`,
      model
    );
    if (existingAssociation) {
      throw new Error("AssociationAlreadyExists");
    } else {
      const sql = `
      INSERT INTO feature_to_login (feature_id, login_id)
      VALUES ($<feature_id>, $<login_id>)
      RETURNING id, feature_id, login_id;
    `;
      const result = await db.one(sql, model);
      return result;
    }
  } catch (error) {
    console.error("Error in insert function:", error);
    throw error;
  }
};

const remove = async (id: string) => {
  const sql = `
  DELETE FROM feature_to_login
  WHERE id = $<id>
  `;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export default {
  insert,
  remove,
  getLoginsByFeature,
};
