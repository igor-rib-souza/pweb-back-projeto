import { Request, Response } from "express";
import { MovieService } from "../services/movie.service";

const movieService = new MovieService();

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { tmdbId } = req.body;

    if (!tmdbId) return res.status(422).json({ error: "tmdbId é obrigatório" });

    const movie = await movieService.createMovie(tmdbId);

    return res.status(201).json(movie);
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao criar filme" });
  }
};

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await movieService.getAll();
  return res.status(200).json(movies);
};

export const getMovieById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const movie = await movieService.getById(id);

  if (!movie) return res.status(404).json({ error: "Filme não encontrado" });

  return res.status(200).json(movie);
};
