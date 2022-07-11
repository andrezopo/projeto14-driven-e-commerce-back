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
    quantidade: produto.quantidade,
    valorTotal: produto.valorTotal,
  };

  console.log(produtoCarrinho);

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

export async function showProducts(request, response) {
  const usuario = response.locals.usuario;

  try {
    const produtosCarrinho = await db
      .collection("carrinho")
      .find({ email: usuario.email })
      .toArray();
    response.status(201).send(produtosCarrinho);
  } catch (error) {
    response.status(500).send();
  }
}

export async function deleteProduct(request, response) {
  const { authorization, idproduto } = request.headers;
  const token = authorization?.replace("Bearer ", "");

  const usuario = await db.collection("sessoes").findOne({ token });

  if (!usuario) {
    response.status(422).send();
    return;
  }

  try {
    const produtoDeletado = await db
      .collection("carrinho")
      .deleteOne({ _id: ObjectId(idproduto) });
    response.status(201).send(produtoDeletado);
  } catch (error) {
    response.status(500).send();
  }
}

export async function updateProduct(request, response) {
  const produto = request.body;

  console.log(produto);

  try {
    const produtoAtualizado = await db.collection("carrinho").updateOne(
      { descricao: produto.descricao },
      {
        $set: {
          quantidade: produto.quantidade,
          valorTotal: produto.valorTotal,
        },
      }
    );
    response.status(201).send(produtoAtualizado);
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

export async function confirmPurchase(req, res) {
  try {
    const purchase = req.body;
    const { email } = res.locals.usuario;

    await db.collection("compras").insertOne({
      ...purchase,
      email,
    });

    await db.collection("carrinho").deleteMany({ email });

    res.status(201).send("Compra realizada com sucesso!");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro interno!");
  }
}
