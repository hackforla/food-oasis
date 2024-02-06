import awsService from "../services/aws-service";
import { RequestHandler } from "express";
import {
  SearchForTextResult,
  SearchPlaceIndexForTextCommandOutput,
} from "@aws-sdk/client-location";

const autocomplete: RequestHandler<
  never,
  SearchForTextResult[],
  { params: string | Record<string, never> },
  never
> = async (req, res) => {
  try {
    const { address, tenantId } = req.query;
    const response = await awsService.autocomplete(address, tenantId);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getCoords: RequestHandler<
  never,
  SearchPlaceIndexForTextCommandOutput,
  { params: string | Record<string, never> },
  never
> = async (req, res) => {
  try {
    const { address } = req.query;
    const response = await awsService.getCoords(address);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default {
  autocomplete,
  getCoords,
};
