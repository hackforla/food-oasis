import neighborhoodService from "../services/neighborhood-service";
import { RequestHandler } from "express";
import {
  Neighborhood,
  NeighborhoodGeoJSON,
} from "../../types/neighborhood-types";

const getAll: RequestHandler<
  never,
  Neighborhood[] | { error: string },
  never,
  { tenantId: string | "1" }
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
  { neighborhoodId: number },
  NeighborhoodGeoJSON | { error: string },
  never,
  never
> = (req, res) => {
  const { neighborhoodId } = req.params;
  neighborhoodService
    .selectGeoJSONById(Number(neighborhoodId))
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const updateZoom: RequestHandler<
  { neighborhoodId: number },
  never,
  { neighborhoodId: number; zoom: number },
  never
> = (req, res) => {
  const { neighborhoodId, zoom } = req.body;
  const { neighborhoodId: ncIdParam } = req.params;
  if (Number(ncIdParam) !== neighborhoodId) {
    res.sendStatus(400);
  }

  neighborhoodService
    .updateZoom(neighborhoodId, zoom)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.status(500);
    });
};
export default {
  getAll,
  getGeoJSONById,
  updateZoom,
};
