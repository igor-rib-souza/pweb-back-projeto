import { Router } from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, getAllPayments);
router.get("/:id", authenticate, getPaymentById);
router.post("/", authenticate, createPayment);
router.put("/:id", authenticate, updatePayment);
router.delete("/:id", authenticate, deletePayment);

export default router;
