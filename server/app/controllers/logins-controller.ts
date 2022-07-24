import loginsService from "../services/logins-service";
import { RequestHandler } from "express";
import { Login } from "../types/logins-types";

const getAll: RequestHandler<
  never,
  Login[],
  never,
  { email?: string; tenantId: string }
> = async (req, res) => {
  try {
    const resp = await loginsService.selectAll(
      req.query.email,
      req.query.tenantId
    );
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  getAll,
};
