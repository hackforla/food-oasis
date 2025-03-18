import db from "./db";
import { Announcement } from "../../types/announcement-types";

const getAll = async (): Promise<Announcement[]> => {
  const sql = `
  SELECT id, name 
  FROM local_notifications
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: LocalNotifications): Promise<LocalNotifications> => {
  const sql = `
    INSERT INTO local_notifications(name)
    VALUES ($<name>)
    RETURNING id, name
  `;
  const result = await db.one(sql, { ...model });
  return result;
};

const remove = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await db.tx(async (t) => {
      //const deleteAssociationsQuery = `
        //DELETE FROM feature_to_login
        //WHERE feature_id = $<id>
      //`;
      //await t.none(deleteAssociationsQuery, { id: Number(id) });
      const deleteLocalNotificationsQuery = `
        DELETE FROM local_notifications
        WHERE id = $<id>
      `;
      await t.none(deleteLocalNotificationsQuery, { id: Number(id) });
    });
    return {
      success: true,
      //message: "Feature and associated logins deleted successfully.",
	  message: "LocalNotifications deleted successfully.",
    };
  } catch (error) {
    console.error("Error in remove function:", error);
    throw error;
  }
};


const update = async (id: number, name: string): Promise<LocalNotifications> => {
  const sql = `
    UPDATE local_notifications
	SET name = $<name>
    WHERE id = $<id>
    RETURNING id, name;
`;
  const result = await db.one(sql, { id, name });
  return result;
};


/*
const update = async (id: number, name: string): Promise<LocalNotifications> => {
  const sql = `
    UPDATE local_notifications
	SET name = bird
    WHERE id = $<id>
    RETURNING id, name;
`;
  const result = await db.one(sql, { id, name });
  return result;
};
*/

export default {
  insert,
  getAll,
  remove,
  update,
};
