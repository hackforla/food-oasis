import stakeholderService from "../services/stakeholder-best-service";
import { RequestHandler } from "express";
import {
  Stakeholder,
  StakeholderBestSearchParams,
} from "../../types/stakeholder-types";

const search: RequestHandler<
  never,
  Stakeholder[] | { error: string },
  never,
  StakeholderBestSearchParams
> = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!req.query.latitude || !req.query.longitude) {
    res
      .status(404)
      .json({ error: "Bad request: needs latitude and longitude parameters" });
  }
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11", "12"];
  } else if (typeof categoryIds === "string") {
    categoryIds = [categoryIds];
  }
  const params = { ...req.query, categoryIds };
  stakeholderService
    .search(params)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err.toString() });
    });
};

const getById: RequestHandler<
  { id: string },
  Stakeholder | { error: string },
  never,
  never
> = (req, res) => {
  const { id } = req.params;
  stakeholderService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

export default {
  search,
  getById,
};
