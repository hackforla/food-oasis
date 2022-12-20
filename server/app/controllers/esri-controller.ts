import esriService from "../services/esri-service";
import { RequestHandler } from "express";

const geocode: RequestHandler<
  never,
  any[],
  { params: string | Record<string, never> },
  never
> = async (req, res) => {
  try {
    const { address } = req.query;
    const response = await esriService.geocode(address);
    res.send(response);
  } catch (err: any) {
    // In order to surface the error at the client, we need to
    // return it as a successful web api request, then detect that
    // it's an error at the client.
    res.json(err);
  }
};

export default {
  geocode,
};
