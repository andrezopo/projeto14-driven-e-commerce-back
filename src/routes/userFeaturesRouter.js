import { Router } from "express";

import { addToCard, showProducts, deleteProduct} from "../controllers/userFeaturesController.js"
import validateUser from '../middlewares/validateUser.js';
import validateBody from "../middlewares/validateBodySchema.js";
import productSchema from "../schemas/productSchema.js";

const router = Router();

router.post("/carrinho", validateUser, validateBody(productSchema), addToCard);

router.get("/carrinho", validateUser, showProducts);

router.delete("/carrinho", deleteProduct)

export default router;