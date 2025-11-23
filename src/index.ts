import express from "express";
import { sequelize } from "./config/database";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("🔥 Banco conectado com sucesso!");

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando em http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
  }
};

start();
