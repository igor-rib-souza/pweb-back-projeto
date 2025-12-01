import { Router } from "express";
import {
  createRental,
  extendRental,
  getRentalByUser,
  getAllRentals,
} from "../controllers/rental.controller";

const router = Router();

router.get("/", getAllRentals);
router.get("/user/:userId", getRentalByUser);
router.post("/", createRental);
router.patch("/:id/extend", extendRental);

export default router;
