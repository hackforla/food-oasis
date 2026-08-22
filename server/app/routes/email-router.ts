import { Router } from "express";
import { sendContactForm } from "../controllers/email-controller";

const router: Router = Router();

router.post("/contact", sendContactForm);

export default router;
