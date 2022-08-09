import neighborhoodService from "../services/neighborhood-service";
import { RequestHandler } from "express";
import { Neighborhood, NeighborhoodGeoJSON } from "../types/neighborhood-types";

const getAll: RequestHandler<
  never,
  Neighborhood[] | { error: string },
  never,
  never
> = (_req, res) => {
  neighborhoodService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const getGeoJSONById: RequestHandler<
  { id: number },
  NeighborhoodGeoJSON | { error: string },
  never,
  never
> = (req, res) => {
  const { id } = req.params;
  neighborhoodService
    .selectGeoJSONById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getGeoJSONById,
};
