import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helloRouter from "./routes/helloRouter.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import userFeaturesRouter from "./routes/userFeaturesRouter.js";
import verifyExpiredTokens from "./middlewares/verifyExpiredTokens.js";

dotenv.config();

const app = express();
app.use([express.json(), cors()]);

app.use(helloRouter);
app.use(authRouter);
app.use(productRouter);
app.use(userFeaturesRouter);

setInterval(verifyExpiredTokens, 15000);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
