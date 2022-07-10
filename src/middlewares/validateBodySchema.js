const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(401).send("Revise os dados de preenchimento!");
      return;
    }
    next();
  };
};

export default validateBody;
