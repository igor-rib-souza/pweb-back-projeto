import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { ADMIN_ROLE } from "../constants/roles";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", authenticate, authorize(ADMIN_ROLE), createCategory);
router.put("/:id", authenticate, authorize(ADMIN_ROLE), updateCategory);
router.delete("/:id", authenticate, authorize(ADMIN_ROLE), deleteCategory);

export default router;
