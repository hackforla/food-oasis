import stakeholderLogService from "../services/stakeholder-log-service";
import { RequestHandler } from "express";

const getById: RequestHandler<
  { id: string },
  any[] | { error: string },
  never,
  never
> = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await stakeholderLogService.selectById(Number(id));
    res.send(resp);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default {
  getById,
};
