import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helloRouter from "./routes/helloRouter.js";

dotenv.config();

const app = express();
app.use([express.json(), cors()]);

app.use(helloRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
