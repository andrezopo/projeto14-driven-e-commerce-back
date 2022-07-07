import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.email().required(),
  password: joi,
});
