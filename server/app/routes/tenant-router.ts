import { Router } from "express";
const router = Router();
import tenantController from "../controllers/tenant-controller";

router.get("/", tenantController.getAll);
router.get("/:id", tenantController.getById);
router.post("/", tenantController.post);
router.put("/:id", tenantController.put);
router.delete("/:id", tenantController.remove);

export default router;
