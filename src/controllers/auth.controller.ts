import { Request, Response } from "express";
import { comparePassword, generateToken } from "../utils/auth";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await await userService.getByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user.id, user.role);

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in", error: err });
  }
};
