import { RequestHandler } from "express";
import categoryService from "../services/category-service";
import { Category } from "../types/category-types";

const getAll: RequestHandler<
  never,
  Category[],
  { params: string | {} },
  never
> = async (req, res) => {
  try {
    const resp = await categoryService.selectAll();
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById: RequestHandler<{ id: string }, Category, never, never> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const resp = await categoryService.selectById(id);
    res.send(resp);
  } catch (err: any) {
    if (err.code === 0) {
      res.sendStatus(404);
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const post: RequestHandler<
  never,
  { id: string } | { error: string },
  Category,
  never
> = async (req, res) => {
  try {
    const resp = await categoryService.insert(req.body);
    res.status(201).json(resp);
  } catch (err: any) {
    if (err.message.includes("duplicate")) {
      res.status(400).json({ error: "Cannot insert duplicate row." });
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const put: RequestHandler<{ id: string }, never, Category, never> = async (
  req,
  res
) => {
  try {
    await categoryService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const remove: RequestHandler<
  { id: string },
  { error?: string },
  { id: string },
  never
> = async (req, res) => {
  try {
    // params are always strings, need to
    // convert to correct Javascript type, so
    // pg=promise can format SQL correctly.
    const id = Number(req.params.id);
    const rowCount = await categoryService.remove(id);
    if (rowCount !== 1) {
      res.status(400).json({ error: "Record not found" });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  getAll,
  getById,
  post,
  put,
  remove,
};
