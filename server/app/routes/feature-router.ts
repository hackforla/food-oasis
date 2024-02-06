import { Router } from "express";
import featureController from "../controllers/feature-controller";

const router = Router();

router.get("/", featureController.getAll);
router.post("/", featureController.post);

export default router;
