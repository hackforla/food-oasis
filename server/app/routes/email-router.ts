import { Router } from "express";
import { sendContactForm } from "../controllers/email-controller";
import { moderateAuthLimiter } from "../../middleware/rate-limit";

const router: Router = Router();

router.post("/contact", moderateAuthLimiter, sendContactForm);

export default router;
