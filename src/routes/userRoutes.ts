import { Router } from "express";
import { UserService } from "../services/userService.js";

const router = Router();
const userService = new UserService();

router.post("/", async (req, res) => {
  try {
    const user = userService.create(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  const users = userService.list();
  res.json(users);
});

export default router;
