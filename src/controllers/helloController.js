import { db } from "../dbStrategy/mongo.js";

export async function hello(req, res) {
  res.status(200).send("Hello world");

  console.log("Hello");
}
