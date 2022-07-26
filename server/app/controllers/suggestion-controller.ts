import suggestionService from "../services/suggestion-service";
import { RequestHandler } from "express";

const getAll: RequestHandler<
  // route params
  never,
  //response
  number[],
  // request body
  { statusIds: []; tenantTd: [] },
  // req query
  any
> = async (req, res) => {
  try {
    const resp = await suggestionService.selectAll(req.query);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById: RequestHandler<{ id: string }, any, never> = async (
  req,
  res
) => {
  try {
    const id = Number(req.params.id);
    const resp = await suggestionService.selectById(id);
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

const post: RequestHandler<never, object | { error: string }, object> = async (
  req,
  res
) => {
  try {
    const resp = await suggestionService.insert(req.body);
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

const put: RequestHandler<{ id: string }, never, object> = async (req, res) => {
  try {
    await suggestionService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

export default {
  getAll,
  getById,
  post,
  put,
};
