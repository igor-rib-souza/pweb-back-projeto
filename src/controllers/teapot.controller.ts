import { Request, Response } from "express";

export const getTeapot = async (req: Request, res: Response) => {
    res.status(418).json({ message: "I'm a teapot" });
};