import { db, ObjectId } from "../dbStrategy/mongo.js";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  try {
    const user = req.body;
    const alreadyUsed = await db
      .collection("usuarios")
      .findOne({ email: user.email });
    if (alreadyUsed) {
      res.status(400).send("Revise os dados de preenchimento!");
      return;
    }
    const encryptedPassword = jwt.sign(
      { password: user.password },
      "Dupla dinâmica"
    );
    await db.collection("usuarios").insertOne({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send("Erro interno!");
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await db.collection("usuarios").findOne({ email });
    if (!user) {
      res.status(400).send("E-mail e/ou senha inválidos!");
      return;
    }
    const { password: decryptedPassword } = jwt.verify(
      user.password,
      "Dupla dinâmica"
    );
    if (password !== decryptedPassword) {
      res.status(400).send("E-mail e/ou senha inválidos!");
      return;
    }
    const token = jwt.sign({ email: user.email }, "Defensivo agrícola");
    await db.collection("sessoes").insertOne({
      email,
      token,
      time: Date.now(),
    });
    res.status(200).send({
      name: user.name,
      id: user._id,
      token,
    });
  } catch (err) {
    res.status(500).send("Erro interno!");
  }
}
