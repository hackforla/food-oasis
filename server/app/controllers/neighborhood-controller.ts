import neighborhoodService from "../services/neighborhood-service";
import { RequestHandler, Response } from "express";
import {
  Neighborhood,
  NeighborhoodGeoJSON,
  NeighborhoodPutRequest,
} from "../../types/neighborhood-types";

const getAll: RequestHandler<
  never,
  Neighborhood[] | { error: string },
  never,
  { tenantId: string }
> = (req, res) => {
  const { tenantId } = req.query;
  neighborhoodService
    .selectAll(Number(tenantId || 1))
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const getGeoJSONById: RequestHandler<
  { ncId: number },
  NeighborhoodGeoJSON | { error: string },
  never,
  never
> = (req, res) => {
  const { ncId } = req.params;
  neighborhoodService
    .selectGeoJSONById(Number(ncId))
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const updateZoom: RequestHandler<
  { ncId: number },
  never,
  { ncId: number; zoom: number },
  never
> = (req, res) => {
  const { ncId, zoom } = req.body;
  const { ncId: ncIdParam } = req.params;
  if (Number(ncIdParam) !== ncId) {
    res.sendStatus(400);
  }

  neighborhoodService
    .updateZoom(ncId, zoom)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((_err) => {
      res.status(500);
    });
};

module.exports = {
  getAll,
  getGeoJSONById,
  updateZoom,
};
