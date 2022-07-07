import { hello } from "../controllers/helloController.js";
import { Router } from "express";

const router = Router();

router.get("/hello", hello);

export default router;
