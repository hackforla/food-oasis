import { RequestHandler } from "express";
import { FeatureToLogin } from "../../types/feature-to-login-types";
import featureToLoginService from "../services/feature-to-login-service";

// Create Association: POST /feature-to-login
const post: RequestHandler<
  never,
  { id: number } | { error: string } | { message: string },
  FeatureToLogin
> = async (req, res) => {
  try {
    const resp = await featureToLoginService.insert(req.body);
    res.status(201).json(resp);
    // res.status(201).send({ message: "feature to login table POST" });
  } catch (error) {
    console.error(error);
  }
};

// Delete Association: DELETE /feature-to-login/:id
const remove: RequestHandler<
  { id: string },
  Response | { error: string } | { message: string },
  never
> = async (req, res) => {
  try {
    const rowCount = await featureToLoginService.remove(req.params.id);
    if (rowCount !== 1)
      return res.status(400).json({ error: "Record not found" });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  // res.send({ message: "feature to login remove an association" });
};

// List Logins by Feature: `GET /features/:feature_id/logins`
const getLoginsByFeature: RequestHandler<
  { feature_id: number },
  FeatureToLogin[] | { error: string },
  never
> = async (req, res) => {
  try {
    const resp = await featureToLoginService.getLoginsByFeature(
      req.params.feature_id
    );
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// List Features by Login: `GET /logins/:login_id/features`
const getFeatureByLogin: RequestHandler<
  { login_id: number },
  FeatureToLogin[] | { error: string } | { message: string },
  never
> = async (req, res) => {
  try {
    const resp = await featureToLoginService.getFeatureByLogin(
      req.params.login_id
    );
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  post,
  remove,
  getLoginsByFeature,
  getFeatureByLogin,
};
