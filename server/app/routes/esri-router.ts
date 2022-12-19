import express from "express";
import esriController from "../controllers/esri-controller";
const router = express.Router();

router.get("/geocode", esriController.geocode);

export default router;
