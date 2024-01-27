import { RequestHandler } from "express";
import { Feature } from "../../types/feature-types";
import featureService from "../services/feature-service";

const getAll: RequestHandler<
  never,
  Feature[] | { error: string },
  never
> = async (req, res) => {
  try {
    const resp = await featureService.getAll();
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  Feature
> = async (req, res) => {
  try {
    const resp = await featureService.insert(req.body);
    res.status(201).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  post,
  getAll,
};
