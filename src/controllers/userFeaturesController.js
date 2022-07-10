import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function addToCard(request, response) {
  const produto = request.body;

  const usuario = response.locals.usuario;

  const produtoCarrinho = {
    email: usuario.email,
    imagem: produto.imagem,
    valor: produto.valor,
    descricao: produto.descricao,
    categoria: produto.categoria,
  };

  console.log(produtoCarrinho)

  try {
    const produtoRepetido = await db
      .collection("carrinho")
      .find({ descricao: produto.descricao })
      .toArray();

    if (produtoRepetido.length !== 0) {
      response
        .status(400)
        .send(
          "Produto já adicionado ao carrinho. Tente inserir um produto diferente."
        );
      return;
    }

    await db.collection("carrinho").insertOne(produtoCarrinho);
    response.status(201).send(produtoCarrinho);
  } catch (error) {
    response.status(500).send();
  }
}

export async function changePassword(req, res) {
  const { newPassword } = req.body;

  const user = res.locals.usuario;

  const dbUser = await db.collection("usuarios").findOne({ email: user.email });

  if (dbUser.password === newPassword) {
    res.status(422).send("É necessário colocar uma senha diferente da atual!");
    return;
  }

  await db.collection("usuarios").updateOne(
    { email: user.email },
    {
      $set: {
        password: newPassword,
      },
    }
  );

  res.status(200).send("Senha atualizada com sucesso!");
}
