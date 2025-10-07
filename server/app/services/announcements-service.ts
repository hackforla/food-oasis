import db from "./db";
import { Announcement } from "../../types/announcements-types";

const getAll = async (): Promise<Announcement[]> => {
  const sql = `
  SELECT id, title, description, is_enabled, created_at, severity
  FROM announcements
  ORDER BY created_at DESC
  `;
  const result = await db.manyOrNone(sql);
  return result;
};

const insert = async (model: Announcement): Promise<Announcement> => {
  const sql = `
    INSERT INTO announcements(title, description, is_enabled,severity)
    VALUES ($<title>, $<description>, $<is_enabled>, $<severity>)
    RETURNING id, title, description, is_enabled, created_at, severity;
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

const update = async (
  id: string,
  data: Announcement
): Promise<Announcement> => {
  try {
    const sql = `
      UPDATE announcements
      SET title = $<title>, description = $<description>, is_enabled = $<is_enabled>, severity = $<severity>
      WHERE id = $<id>
      RETURNING *
    `;
    return await db.one(sql, { ...data, id: Number(id) });
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
