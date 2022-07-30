import suggestionService from "../services/suggestion-service";
import { RequestHandler, Response } from "express";
import { Suggestion } from "../types/suggestion-types";

const getAll: RequestHandler<
  // route params
  never,
  //response
  Suggestion[],
  // request body
  never,
  // req query
  { statusIds: string[]; tenantId: string }
> = async (req, res) => {
  try {
    const resp = await suggestionService.selectAll(req.query);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById: RequestHandler<{ id: string }, Suggestion, never> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
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

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  Suggestion
> = async (req, res) => {
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

const put: RequestHandler<{ id: string }, never, Suggestion> = async (
  req,
  res
) => {
  try {
    await suggestionService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const remove: RequestHandler<{ id: string }, Response, never, never> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await suggestionService.remove(id);
    res.sendStatus(200);
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
