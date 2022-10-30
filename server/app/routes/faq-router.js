import { Router } from "express";
import faqController from "../controllers/faq-controller";
const jwtSession = require("../../middleware/jwt-session");

const router = Router();

router.get("/", faqController.getAll);
router.get("/language/:language", faqController.getAllByLanguage);
router.get("/faq/:id", faqController.getById);
router.get("/identifier/:identifier", faqController.getByIdentifier);
router.post(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  faqController.post
);

router.put(
  "/faq/:id",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  faqController.put
);

router.delete(
  "/",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  faqController.remove
);

module.exports = router;
