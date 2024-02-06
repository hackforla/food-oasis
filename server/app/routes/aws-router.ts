import express from "express";
import awsController from "../controllers/aws-controller";
const router = express.Router();

router.get("/autocomplete", awsController.autocomplete);

router.get("/getCoords", awsController.getCoords);

export default router;
