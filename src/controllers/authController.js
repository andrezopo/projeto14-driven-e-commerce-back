import { db, ObjectId } from "../dbStrategy/mongo.js";
import jwt from "jsonwebtoken";
import signUpSchema from "../schemas/signUpSchema.js";

export async function signUp(req, res) {
  try {
    const user = req.body;
    const { error } = signUpSchema.validate(user);
    if (error) {
      res.status(400).send("Revise os dados de preenchimento do cadastro!");
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Erro interno!");
  }
}
