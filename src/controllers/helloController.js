import { db } from "../dbStrategy/mongo.js";

export async function hello(req, res) {
  await db.collection("teste").insertOne({ teste: "teste" });
  res.status(200).send("Hello world");

  console.log("Hello");
}
