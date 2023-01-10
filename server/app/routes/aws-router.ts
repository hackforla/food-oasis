import express from "express";
import awsController from "../controllers/aws-controller";
const router = express.Router();

router.get("/geocode", awsController.geocode);

export default router;