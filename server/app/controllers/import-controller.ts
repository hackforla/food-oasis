import scraperLaplFoodResourcesService from "../import/lapl-food-resources-scrape";
import svc from "../services/load-lapl-service";
import importService from "../services/import-service";
import { RequestHandler } from "express";
import { ImportAction } from "../../types/import-types";
import { LAPLFoodResource } from "../../types/load-lapl-types";

// LA Public Library Food Resources Listing - Scraped
const getLaplFoodResources: RequestHandler<
  never,
  LAPLFoodResource[] | { error: string },
  never,
  never
> = async (_req, res) => {
  try {
    const response = await scraperLaplFoodResourcesService.selectAll();
    await svc.removeAll();
    if (!response) {
      return [];
    }
    response.forEach(async (row) => {
      await svc.insert(row);
    });
    res.send(response);
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
};

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
  { data: any; action: ImportAction; tenantId: number },
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
  getLaplFoodResources,
  uploadStakeholderCsv,
  importStakeholderCsv,
};
