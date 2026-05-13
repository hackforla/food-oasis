import importService from "../services/import-service";
import { RequestHandler } from "express";
import { ImportAction } from "../../types/import-types";
import { InsertStakeholderParams } from "../../types/stakeholder-types";

// TODO: update any type
const uploadStakeholderCsv: RequestHandler<never, any, never, never> = async (
  req,
  res
) => {
  const { file } = req;
  if (!file) return;
  try {
    const response = await importService.parseCsv(file);
    res.send(response);
  } catch (err: any) {
    console.error(err.message);
  }
};

const importStakeholderCsv: RequestHandler<
  never,
  void,
  // TODO: update data type, possibly stakeholder array
  { data: InsertStakeholderParams[]; action: ImportAction; tenantId: number },
  never
> = async (req, res) => {
  const { data, action, tenantId } = req.body;
  try {
    const response = await importService.importCsv(data, action, tenantId);
    res.send(response);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default {
  uploadStakeholderCsv,
  importStakeholderCsv,
};
