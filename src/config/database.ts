import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_HOST) throw new Error("DB_HOST não definido");
if (!process.env.DB_NAME) throw new Error("DB_NAME não definido");
if (!process.env.DB_USER) throw new Error("DB_USER não definido");
//if (!process.env.DB_PASSWORD) throw new Error("DB_PASSWORD não definido");

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);
