import { Router } from "express";
import { signUp } from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", signUp);

export default router;
