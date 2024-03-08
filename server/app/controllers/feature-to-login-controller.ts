import { RequestHandler } from "express";
import { FeatureToLogin } from "../../types/feature-to-login-types";
import featureToLoginService from "../services/feature-to-login-service";

// Get all Logins by Feature
const getLoginsByFeature: RequestHandler<
  never,
  FeatureToLogin[] | { error: string },
  never
> = async (req, res) => {
  try {
    const resp = await featureToLoginService.getLoginsByFeature();
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Association
const post: RequestHandler<
  never,
  { id: number } | { error: string } | { message: string },
  FeatureToLogin
> = async (req, res) => {
  try {
    const resp = await featureToLoginService.insert(req.body);
    res.status(201).json(resp);
  } catch (error: any) {
    console.error(error);
    if (error.message === "AssociationAlreadyExists") {
      return res
        .status(409)
        .json({ message: "User is already added to feature." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Delete Association
const remove: RequestHandler<
  { id: string },
  Response | { error: string },
  never
> = async (req, res) => {
  try {
    const rowCount = await featureToLoginService.remove(req.params.id);
    if (rowCount !== 1) {
      return res.status(400).json({ error: "Record not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  post,
  remove,
  getLoginsByFeature,
};
