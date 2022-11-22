import tenantService from "../services/tenant-service";
import { RequestHandler, Response } from "express";
import { Tenant } from "../../types/tenant-types";

const getAll: RequestHandler<
  never,
  Tenant[],
  never,
  { searchParams: string }
> = async (req, res) => {
  try {
    const resp = await tenantService.selectAll();
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getById: RequestHandler<{ id: string }, Tenant, never, never> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const resp = await tenantService.selectById(id);
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

const post: RequestHandler<never, { error: string }, Tenant, never> = async (
  req,
  res
) => {
  try {
    await tenantService.insert(req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err instanceof Error && err.message.includes("duplicate")) {
      res.status(400).json({ error: "Cannot insert duplicate row." });
    } else {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const put: RequestHandler<
  { id: string },
  { error: string },
  Tenant,
  never
> = async (req, res) => {
  try {
    if (Number(req.params.id) !== req.body.id) {
      res.status(400).json({
        error: "Request parameter 'id' does not match body of request.",
      });
      return;
    }
    const rowCount = await tenantService.update(req.body);
    if (rowCount !== 1) {
      res.status(400).json({ error: "Record not found" });
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler<
  { id: string },
  { error: string },
  never,
  never
> = async (req, res) => {
  try {
    // params are always strings, need to
    // convert to correct Javascript type, so
    // pg=promise can format SQL correctly.
    const id = req.params.id;
    const rowCount = await tenantService.remove(id);
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
