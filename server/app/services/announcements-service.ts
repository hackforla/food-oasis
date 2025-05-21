import db from "./db";
import { Announcements } from "../../types/announcements-types";

interface Announcements {
  id: number;
  title: string;
  description: string;
  is_enabled: boolean;
}

const getAll = async (): Promise<Announcements[]> => {
  const sql = `
  SELECT id, title, description, is_enabled 
  FROM announcements
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: Announcements): Promise<Announcements> => {
  const sql = `
    INSERT INTO announcements(title, description, is_enabled)
    VALUES ($<title>, $<description>, $<is_enabled>)
    RETURNING id, title, description, is_enabled;
  `;
  const result = await db.one(sql, { ...model });
  return result;
};

const remove = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await db.tx(async (t) => {
      const deleteAnnouncementsQuery = `
        DELETE FROM announcements
        WHERE id = $<id>
      `;
      await t.none(deleteAnnouncementsQuery, { id });
    });
    return {
      success: true,
	  message: "Announcements deleted successfully.",
    };
  } catch (error) {
    console.error("Error in remove function:", error);
    throw error;
  }
};


const update = async (id: number, title: string, description: string, is_enabled: boolean): Promise<Announcements> => {
  try {
    const sql = `
      UPDATE announcements
      SET title = $<title>,
          description = $<description>,
          is_enabled = $<is_enabled>
      WHERE id = $<id>
      RETURNING id, title, description, is_enabled;
    `;
    const result = await db.one(sql, { id, title, description, is_enabled });
    return result;
  } catch (error) {
    console.error("Error in update function:", error);
    throw error;
  }
};

export default {
  insert,
  getAll,
  remove,
  update,
};