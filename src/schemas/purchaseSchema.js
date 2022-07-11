import joi from "joi";

const purchaseSchema = joi.object({
  option: joi.string().valid("Cartao", "Pix").required(),
  cardNumber: joi.string().required(),
  securityCode: joi.string().required(),
  nameOnCard: joi.string().required(),
  products: joi.array().min(1),
});

export default purchaseSchema;
