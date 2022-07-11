import joi from "joi";

const passwordSchema = joi.object({
  password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .required(),
});

export default passwordSchema;
