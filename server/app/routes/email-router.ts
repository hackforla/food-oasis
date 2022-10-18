import { Router } from "express";
import { send } from "../controllers/email-controller";

const router: Router = Router();

router.post("/", send);

module.exports = router;
