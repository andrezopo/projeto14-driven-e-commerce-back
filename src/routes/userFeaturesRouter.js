import { Router } from "express";

import {
  addToCard,
  changePassword,
} from "../controllers/userFeaturesController.js";
import validateUser from "../middlewares/validateUser.js";
import validateBody from "../middlewares/validateBodySchema.js";
import productSchema from "../schemas/productSchema.js";
import passwordSchema from "../schemas/passwordSchema.js";

const router = Router();

router.post("/carrinho", validateUser, validateBody(productSchema), addToCard);

router.put(
  "/senha",
  validateUser,
  validateBody(passwordSchema),
  changePassword
);

export default router;
