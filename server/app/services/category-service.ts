import { Category } from "../types/category-types";
import db from "./db";
import camelcaseKeys from "camelcase-keys";

const selectAll = async (): Promise<Category[]> => {
  const sql = `
    select id, name, display_order as displayOrder, inactive
    from category
    order by name
  `;
  const result: Category[] = await db.manyOrNone(sql);
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (id: string): Promise<Category> => {
  const sql = `select id, name, display_order as displayOrder, inactive
   from category where id = $<id>`;

  const row: Category = await db.one(sql, { id: Number(id) });
  return camelcaseKeys(row);
};

const insert = async (model: Category): Promise<{ id: string }> => {
  model.suggestionStatusId = 1;
  const sql = `insert into category (name) values ($<name>) returning id`;

  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (model: Category) => {
  const sql = `update category
               set name = $<name>
                where id = $<id>`;
  await db.none(sql, model);
};

const remove = async (id: number): Promise<number> => {
  const sql = `delete from category where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export default {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
