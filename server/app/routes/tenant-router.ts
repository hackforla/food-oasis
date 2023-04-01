import { Router } from "express";
const router = Router();
import tenantController from "../controllers/tenant-controller";
import {requestValidationMiddleware} from '../../middleware/request-validation-middlewares'
import { tenantRequestSchema } from '../request-validation-schema';

router.get("/", tenantController.getAll);
router.get("/:id", tenantController.getById);
router.post("/", requestValidationMiddleware(tenantRequestSchema), tenantController.post);
router.put("/:id", tenantController.put);


router.delete("/:id", tenantController.remove);

export default router;
