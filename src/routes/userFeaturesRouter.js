import { Router } from "express";

import { createProduct,  showProducts} from "../controllers/userFeaturesController.js"
import validateBody from "../middlewares/validateBodySchema.js";
import productSchema from "../schemas/productSchema.js";

const router = Router();

router.post("/produtos", validateBody(productSchema), createProduct);

router.get("/produtos", showProducts);

export default router;