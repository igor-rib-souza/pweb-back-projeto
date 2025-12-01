import { Rental } from "../models/rental.model";
import { User } from "../models/user.model";
import { Movie } from "../models/movie.model";

export class RentalService {
  async create(userId: number, movieId: number, days: number) {
    const user = await User.findByPk(userId);
    if (!user) return "user_not_found";

    const movie = await Movie.findByPk(movieId);
    if (!movie) return "movie_not_found";

    const rentedAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(rentedAt.getDate() + days);

    return await Rental.create({
      userId,
      movieId,
      rentedAt,
      expiresAt,
    });
  }

  async extend(id: number, extraDays: number) {
    const rental = await Rental.findByPk(id);

    if (!rental) return null;
    if (rental.extended) return "already_extended";

    rental.expiresAt.setDate(rental.expiresAt.getDate() + extraDays);
    rental.extended = true;

    await rental.save();
    return rental;
  }

  async getByUser(userId: number) {
    return Rental.findAll({
      where: { userId },
      include: [{ model: Movie, as: "movie" }],
    });
  }

  async getById(id: number) {
    return Rental.findByPk(id, {
      include: [{ model: Movie, as: "movie" }],
    });
  }

  async getAll() {
    return Rental.findAll({
      include: [{ model: Movie, as: "movie" }],
    });
  }
}
