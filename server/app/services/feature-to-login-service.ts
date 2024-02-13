import { FeatureToLogin } from "../../types/feature-to-login-types";
import db from "./db";

const insert = async (
  model: FeatureToLogin
): Promise<{ id: number; feature_id: number; login_id: number }> => {
  const sql = `
    INSERT INTO feature_to_login (feature_id, login_id)
    VALUES ($<feature_id>, $<login_id>)
    RETURNING id, feature_id, login_id;
  `;
  const result = await db.one(sql, model);
  return result;
};

const remove = async (id: string) => {
  const sql = `
  DELETE FROM feature_to_login
  WHERE id = $<id>
  `;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

const getLoginsByFeature = async (
  feature_id: number
): Promise<FeatureToLogin[]> => {
  const sql = `
    SELECT u.id as login_id, u.first_name, u.last_name, u.email, ff.name as feature_name
    FROM feature_to_login ftl
      JOIN login u ON u.id = ftl.login_id
      JOIN feature_flag ff ON ff.id = ftl.feature_id
    WHERE ftl.feature_id = ($<feature_id>)
`;
  const result = await db.manyOrNone(sql, { feature_id });
  return result;
};

const getFeatureByLogin = async (
  login_id: number
): Promise<FeatureToLogin[]> => {
  const sql = `
  SELECT ff.id as feature_id, ff.name as feature_name
  FROM feature_to_login ftl
      JOIN login u ON u.id = ftl.login_id
      JOIN feature_flag ff ON ff.id = ftl.feature_id
  WHERE ftl.login_id = ($<login_id>)
  `;
  const result = await db.manyOrNone(sql, { login_id });
  return result;
};

export default {
  insert,
  remove,
  getLoginsByFeature,
  getFeatureByLogin,
};
