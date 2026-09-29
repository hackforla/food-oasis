import { Router } from "express";
import { sendContactForm } from "../controllers/email-controller";
import { createModerateAuthLimiter } from "../../middleware/rate-limit";

const router: Router = Router();

router.post("/contact", createModerateAuthLimiter(), sendContactForm);

export default router;
