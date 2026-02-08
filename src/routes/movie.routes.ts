import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
} from "../controllers/movie.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate, createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

export default router;
