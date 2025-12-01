import { Request, Response } from "express";
import { RentalService } from "../services/rental.service";
const rentalService = new RentalService();

export const createRental = async (req: Request, res: Response) => {
  const { userId, movieId, days } = req.body;

  if (!userId || !movieId || !days) {
    return res.status(422).json({ error: "Missing fields" });
  }

  const result = await rentalService.create(userId, movieId, days);

  if (result === "user_not_found") {
    return res.status(404).json({ error: "User not found" });
  }

  if (result === "movie_not_found") {
    return res.status(404).json({ error: "Movie not found" });
  }

  return res.status(201).json(result);
};


export const extendRental = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { extraDays } = req.body;

  const result = await rentalService.extend(id, extraDays);

  if (result === null) {
    return res.status(404).json({ error: "Rental not found" });
  }

  if (result === "already_extended") {
    return res.status(409).json({ error: "Rental already extended once" });
  }

  return res.status(200).json(result);
};

export const getRentalByUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const rentals = await rentalService.getByUser(userId);
  return res.status(200).json(rentals);
};

export const getAllRentals = async (req: Request, res: Response) => {
  const rentals = await rentalService.getAll();
  return res.status(200).json(rentals);
};
