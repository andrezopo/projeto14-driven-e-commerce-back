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
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let categoria = request.headers.categoria;
  categoria = categoria.toLowerCase();

  if (
    categoria !== "todos" &&
    categoria !== "frutas" &&
    categoria !== "verduras" &&
    categoria !== "legumes" &&
    categoria !== "cereais" &&
    categoria !== "ovos" &&
    categoria !== "carnes"
  ) {
    response.status(422).send();
    console.log("passei aqui carrinho");
    return;
  }

  if (categoria === "todos") {
    try {
      const products = await db.collection("products").find().toArray();
      response.status(200).send(shuffleArray(products));
    } catch (error) {
      response.status(500).send();
    }
  } else {
    try {
      const products = await db
        .collection("products")
        .find({ categoria: categoria })
        .toArray();
      response.status(200).send(shuffleArray(products));
    } catch (error) {
      response.status(500).send();
    }
  }
}
