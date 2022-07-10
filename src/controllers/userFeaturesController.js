import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function createProduct(request, response) {
  const newProduct = request.body;

  try {
    await db.collection("products").insertOne(newProduct);
    response.status(201).send(newProduct);
  } catch (error) {
    response.status(500).send();
  }
}

export async function showProducts(request, response) {
  let categoria = request.headers.categoria;
  categoria = categoria.toLowerCase()

  if (categoria === "todos"){
    try {
      const products = await db.collection("products").find().toArray();
      response.status(201).send(products);
    } catch (error) {
      response.status(500).send();
    }
  } else {
    try {
      const products = await db.collection("products").find({categoria: categoria}).toArray();
      response.status(201).send(products);
    } catch (error) {
      response.status(500).send();
    }
  }
}
