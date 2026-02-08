import { Router } from "express";
import {
  createRental,
  extendRental,
  getRentalByUser,
  getAllRentals,
} from "../controllers/rental.controller";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { ADMIN_ROLE } from "../constants/roles";

const router = Router();

router.get("/", authenticate, authorize(ADMIN_ROLE), getAllRentals);
router.get("/user/:userId", authenticate, getRentalByUser);
router.post("/", authenticate, createRental);
router.patch("/:id/extend", authenticate, extendRental);

export default router;
