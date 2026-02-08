import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { ADMIN_ROLE } from "../constants/roles";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", authenticate, authorize(ADMIN_ROLE), updateUser);
router.delete("/:id", authenticate, authorize(ADMIN_ROLE), deleteUser);

export default router;
