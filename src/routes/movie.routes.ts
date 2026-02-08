import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  getMoviesByCategoryId,
} from "../controllers/movie.controller";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { ADMIN_ROLE } from "../constants/roles";

const router = Router();

router.post("/", authenticate, authorize(ADMIN_ROLE), createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.get("/category/:categoryId", getMoviesByCategoryId);

export default router;
