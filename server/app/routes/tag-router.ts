import { Router } from 'express'
import * as tagController from "../controllers/tag-controller";
import jwtSession from "../../middleware/jwt-session";

const router = Router();

router.get("/:tenantId",
  tagController.getAllByTenantId
);

router.post("/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.post
);

router.put(
  "/:tagId",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.put
);

router.delete("/:tagId",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  tagController.remove
);

module.exports = router;
