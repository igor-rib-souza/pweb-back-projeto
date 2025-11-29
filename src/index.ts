import app from "./app";
import { sequelize } from "./config/database";
import dotenv from "dotenv";
import { logger } from "./logger/index";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Banco de dados conectado com sucesso");

    app.listen(PORT, () => {
      logger.info(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

start();
