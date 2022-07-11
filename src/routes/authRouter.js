import { Router } from "express";
import { signIn, signUp, updateToken } from "../controllers/authController.js";
import validateBody from "../middlewares/validateBodySchema.js";
import validateUser from "../middlewares/validateUser.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const router = Router();

router.post("/cadastro", validateBody(signUpSchema), signUp);

router.post("/login", validateBody(signInSchema), signIn);

router.put("/status", validateUser, updateToken);

export default router;
