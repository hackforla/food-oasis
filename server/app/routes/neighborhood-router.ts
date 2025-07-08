import { Router } from "express";
import neighborhoodController from "../controllers/neighborhood-controller";
const router = Router();

router.get("/", neighborhoodController.getAll);
router.get("/:neighborhoodId", neighborhoodController.getGeoJSONById);
// Endpoint is not used yet, but will be used by an admin screen for adjusting default zoom level of neighborhood
router.put("/:neighborhoodId", neighborhoodController.updateZoom);

export default router;
