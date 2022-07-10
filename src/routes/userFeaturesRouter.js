import { Router } from "express";

import { addToCard} from "../controllers/userFeaturesController.js"
import validateUser from '../middlewares/validateUser.js';
import validateBody from "../middlewares/validateBodySchema.js";
import productSchema from "../schemas/productSchema.js";

const router = Router();

router.post("/carrinho", validateUser, validateBody(productSchema), addToCard);

export default router;