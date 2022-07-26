import { Router } from "express";
import loginsController from "../controllers/logins-controller";
const router = Router();

router.get("/", loginsController.getAll);

module.exports = router;
