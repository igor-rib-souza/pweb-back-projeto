import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto `req`
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
};
