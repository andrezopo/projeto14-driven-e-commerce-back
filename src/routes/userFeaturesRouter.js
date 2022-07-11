import { Router } from "express";


import { addToCard, showProducts, deleteProduct, changePassword} from "../controllers/userFeaturesController.js"
import validateUser from '../middlewares/validateUser.js';
import validateBody from "../middlewares/validateBodySchema.js";
import productSchema from "../schemas/productSchema.js";
import passwordSchema from "../schemas/passwordSchema.js";

const router = Router();

router.post("/carrinho", validateUser, validateBody(productSchema), addToCard);

router.get("/carrinho", validateUser, showProducts);

router.delete("/carrinho", deleteProduct)

router.put(
  "/senha",
  validateUser,
  validateBody(passwordSchema),
  changePassword
);

router.get("/senha", validateUser, (req, res) => {
  res.status(200).send();
});

export default router;
