import { db, ObjectId } from "../dbStrategy/mongo.js";
import jwt from "jsonwebtoken";

async function validateUser(request, response, next) {
  const { authorization, id } = request.headers;
  const token = authorization?.replace("Bearer ", "");

  const usuario = await db.collection("sessoes").findOne({ token });

  if (!usuario) {
    response.status(422).send();
    return;
  }

  const { email } = jwt.verify(token, "Defensivo agrícola");

  const user = await db.collection("usuarios").findOne({ _id: ObjectId(id) });

  if (!user) {
    response.status(404).send("Não autorizado");
  }

  if (email !== user.email) {
    response.status(403).send("Não autorizado!");
    return;
  }

  response.locals.usuario = user;
  response.locals.token = token;

  next();
}

export default validateUser;
