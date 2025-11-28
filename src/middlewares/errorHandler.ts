import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/index.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.message);
  res
    .status(500)
    .json({ error: "INTERNAL_SERVER_ERROR", message: err.message });
}
