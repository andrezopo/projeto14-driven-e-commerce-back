import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helloRouter from "./routes/helloRouter.js";
import authRouter from "./routes/authRouter.js";
import userFeaturesRouter from "./routes/userFeaturesRouter.js"

dotenv.config();

const app = express();
app.use([express.json(), cors()]);

app.use(helloRouter);
app.use(authRouter);

app.use(userFeaturesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
