import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export const createUser = (req: Request, res: Response) => {
  const { name, email, cpf } = req.body;

  if (!name || !email || !cpf) {
    return res.status(400).json({ message: "Nome, email e CPF são obrigatórios" });
  }

  const user = userService.create({ name, email, cpf });
  return res.status(201).json(user);
};

export const listUsers = (_req: Request, res: Response) => {
  const users = userService.list();
  return res.json(users);
};
