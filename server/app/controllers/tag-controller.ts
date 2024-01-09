import { RequestHandler, Response } from "express";
import * as tagService from "../services/tag-service";
import { StakeholderTag } from "../../types/tag-types";
import { Tag } from "../../types/tag-types";

const getAllByTenantId: RequestHandler<
  { tenantId: string },
  Tag[] | { error: string },
  never,
  never
> = async (req, res) => {
  try {
    const resp = await tagService.selectAllById(req.params.tenantId);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  Omit<StakeholderTag, "id">,
  never
> = async (req, res) => {
  try {
    const resp = await tagService.insert(req.body);
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

const put: RequestHandler<
  { tagId: string },
  never,
  Omit<Tag, "id">,
  never
> = async (req, res) => {
  try {
    await tagService.update(req.body, req.params.tagId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const remove: RequestHandler<
  { tagId: string },
  Response | { error: string },
  never,
  never
> = async (req, res) => {
  try {
    const rowCount = await tagService.remove(req.params.tagId);
    if (rowCount !== 1)
      return res.status(400).json({ error: "Record not found" });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export { getAllByTenantId, post, put, remove };
