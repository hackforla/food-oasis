import { Router } from "express";
const router = Router();
import tenantController from "../controllers/tenant-controller";
import {validateTenantMiddleware} from '../../middleware/request-validation-middlewares'

router.get("/", tenantController.getAll);
router.get("/:id", tenantController.getById);
router.post("/", validateTenantMiddleware, tenantController.post);
router.put("/:id", tenantController.put);


router.delete("/:id", tenantController.remove);

export default router;
