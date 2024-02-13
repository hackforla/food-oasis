import { Router } from "express";
import featureToLoginController from "../controllers/feature-to-login-controller";

const router = Router();

// featureToLoginRouter controller: add association
router.post("/", featureToLoginController.post);

// featureToLoginRouter controller: remove an association
router.delete("/:id", featureToLoginController.remove);

// search featureId get a list of logins
router.get(
  "/features/:feature_id/logins",
  featureToLoginController.getLoginsByFeature
);

//search loginId get a list of features
router.get(
  "/logins/:login_id/features",
  featureToLoginController.getFeatureByLogin
);

export default router;
