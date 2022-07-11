import joi from "joi";

const productSchema = joi.object({
  imagem: joi
    .string()
    .regex(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/)
    .required(),
  valor: joi.number().required(),
  descricao: joi.string().required(),
  categoria: joi
    .string()
    .valid("frutas", "verduras", "legumes", "cereais", "ovos", "carnes"),
  quantidade: joi.number().valid(1),
  valorTotal: joi.ref("valor"),
});

export default productSchema;
