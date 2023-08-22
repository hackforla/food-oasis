import { Router } from "express";
import { send, sendContactForm } from "../controllers/email-controller";

const router: Router = Router();

router.post("/", send);
router.post("/contact", sendContactForm);

export default router;
