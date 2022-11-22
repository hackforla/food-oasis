import { RequestHandler, Response } from "express";
import parentOrganizationService from "../services/parent-organization-service";
import { ParentOrganization } from "../../types/parent-organization-types";

const getAllByTenantId: RequestHandler<
  { tenantId: string },
  ParentOrganization[],
  never,
  never
> = async (req, res) => {
  try {
    const resp = await parentOrganizationService.selectAllById(
      req.params.tenantId
    );
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const insert: RequestHandler<
  never,
  { id: number } | { error: string },
  Omit<ParentOrganization, "id">,
  never
> = async (req, res) => {
  try {
    const resp = await parentOrganizationService.insert(req.body);
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

const update: RequestHandler<
  { id: string },
  Response,
  ParentOrganization,
  never
> = async (req, res) => {
  try {
    await parentOrganizationService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const remove: RequestHandler<
  { id: string },
  Response | { error: string },
  never,
  never
> = async (req, res) => {
  try {
    const rowCount = await parentOrganizationService.remove(req.params.id);
    if (rowCount !== 1) {
      res.status(400).json({ error: "Record not found" });
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  getAllByTenantId,
  insert,
  update,
  remove,
};
