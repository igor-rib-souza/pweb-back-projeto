import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ErrorCode } from "../constants/errorCodes";
import { createErrorResponse } from "../utils/errorUtils";
import { isValidCPF } from "../utils/utils";
import { UniqueConstraintError } from "sequelize";

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;

  if (!username) {
    const { status, body } = createErrorResponse(ErrorCode.MISSING_FIELDS, 422);
    return res.status(status).json(body);
  }

  const user = await userService.getByUsername(username);

  if (!user) {
    const { status, body } = createErrorResponse(ErrorCode.USER_NOT_FOUND, 404);
    return res.status(status).json(body);
  }

  return res.status(200).json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userService.getById(id);

  if (!user) {
    const { status, body } = createErrorResponse(ErrorCode.USER_NOT_FOUND, 404);
    return res.status(status).json(body);
  }

  return res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, cpf, password, role } = req.body;

  if (!name || !email || !cpf) {
    const { status, body } = createErrorResponse(ErrorCode.MISSING_FIELDS, 422);
    return res.status(status).json(body);
  }

  if (!isValidCPF(cpf)) {
    const { status, body } = createErrorResponse(
      ErrorCode.INVALID_FORMAT_CPF,
      422,
    );
    return res.status(status).json(body);
  }

  try {
    const newUser = await userService.create({ name, email, cpf, password, role });

    const { password: _, ...userWithoutPassword } = newUser.get({
      plain: true,
    });

    return res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      const field = error.errors?.[0]?.path;

      if (field === "email") {
        const { status, body } = createErrorResponse(
          ErrorCode.EMAIL_ALREADY_EXISTS,
          409,
        );
        return res.status(status).json(body);
      }

      if (field === "cpf") {
        const { status, body } = createErrorResponse(
          ErrorCode.CPF_ALREADY_EXISTS,
          409,
        );
        return res.status(status).json(body);
      }
    }

    const { status, body } = createErrorResponse(ErrorCode.SERVER_ERROR, 500);
    return res.status(status).json(body);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, cpf } = req.body;

  if (cpf && !isValidCPF(cpf)) {
    const { status, body } = createErrorResponse(
      ErrorCode.INVALID_FORMAT_CPF,
      422,
    );
    return res.status(status).json(body);
  }

  const updated = await userService.update(id, { name, email, cpf });

  if (!updated) {
    const { status, body } = createErrorResponse(ErrorCode.USER_NOT_FOUND, 404);
    return res.status(status).json(body);
  }

  return res.status(200).json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await userService.delete(id);

  if (!deleted) {
    const { status, body } = createErrorResponse(ErrorCode.USER_NOT_FOUND, 404);
    return res.status(status).json(body);
  }

  return res.status(204).send();
};
