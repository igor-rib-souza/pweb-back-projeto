import { Router } from "express";
import { createMovie, getAllMovies, getMovieById } from "../controllers/movie.controller";

const router = Router();

router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

export default router;
