import axios from "axios";
import { Movie } from "../models/movie.model";
import { TMDBMovieResponse } from "../types/tmdb-movie.type";

export class MovieService {
  private TMDB_URL = "https://api.themoviedb.org/3/movie/";
  private API_KEY = process.env.TMDB_API_KEY!;

  async fetchMovieFromTMDB(tmdbId: number): Promise<TMDBMovieResponse> {
    const response = await axios.get<TMDBMovieResponse>(
      `${this.TMDB_URL}${tmdbId}?api_key=${this.API_KEY}&language=pt-BR`
    );
    return response.data;
  }

  async createMovie(tmdbId: number) {
    const tmdbData = await this.fetchMovieFromTMDB(tmdbId);

    return await Movie.create({
      tmdbId,
      title: tmdbData.title,
      overview: tmdbData.overview,
      posterPath: tmdbData.poster_path,
      releaseDate: tmdbData.release_date,
    });
  }

  async getAll() {
    return await Movie.findAll();
  }

  async getById(id: number) {
    return await Movie.findByPk(id);
  }
}
