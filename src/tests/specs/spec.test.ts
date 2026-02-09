import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../../middlewares/authMiddleware", () => ({
  authenticate: (_req: any, _res: any, next: any) => next(),
  authorize: (_role: string) => (_req: any, _res: any, next: any) => next(),
}));

import request from "supertest";
import app from "../../app";
import { PaymentStatus } from "../../enums/payment.enum";
import { Rental } from "../../models/rental.model";
import { Payment } from "../../models/payment.model";
import { User } from "../../models/user.model";
import { Movie } from "../../models/movie.model";

const mockRental = {
  id: 1,
  userId: 1,
  movieId: 1,
  days: 3,
  startDate: null,
  endDate: null,
  rentedAt: new Date(),
  extended: false,
  payment: null,
};

const mockPayment = {
  id: 1,
  rentalId: 1,
  method: "PIX",
  amount: 19.99,
  status: PaymentStatus.PENDING,
};

describe("Rental and Payment basic behavior", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a rental with payment as null", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue({ id: 1 } as any);
    vi.spyOn(Movie, "findByPk").mockResolvedValue({ id: 1 } as any);
    vi.spyOn(Rental, "create").mockResolvedValue(mockRental as any);

    const res = await request(app)
      .post("/rental")
      .send({ userId: 1, movieId: 1, days: 3 });

    expect(res.status).toBe(201);
    expect(res.body.payment).toBeNull();
  });

  it("should create a payment with status PENDING", async () => {
    vi.spyOn(Rental, "findByPk").mockResolvedValue({
      id: 1,
      payment: null,
    } as any);
    vi.spyOn(Payment, "create").mockResolvedValue(mockPayment as any);

    const res = await request(app)
      .post("/payments")
      .send({ rentalId: 1, method: "PIX", amount: 19.99, userId: 1 });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe(PaymentStatus.PENDING);
  });

  it("should return 404 if movie does not exist", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue({ id: 1 } as any);
    vi.spyOn(Movie, "findByPk").mockResolvedValue(null); // Simula filme inexistente

    const res = await request(app)
      .post("/rental")
      .send({ userId: 1, movieId: 999, days: 3 });

    expect(res.status).toBe(404);
  });

  it("should return 400 if rental already has a payment", async () => {
    vi.spyOn(Rental, "findByPk").mockResolvedValue({
      id: 1,
      payment: { id: 999 }, // Simula pagamento já existente
    } as any);

    const res = await request(app)
      .post("/payments")
      .send({ rentalId: 1, method: "PIX", amount: 20, userId: 1 });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/payment already exists/i);
  });
});

describe("Payment update behavior", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should update payment to PAID and set startDate/endDate on rental", async () => {
    const mockRental = {
      id: 1,
      days: 5,
      startDate: null,
      endDate: null,
      update: vi.fn().mockResolvedValue(undefined),
    };

    const mockPayment = {
      id: 1,
      rentalId: 1,
      update: vi.fn().mockResolvedValue(undefined),
      status: PaymentStatus.PENDING,
    };

    vi.spyOn(Payment, "findByPk").mockResolvedValue(mockPayment as any);
    vi.spyOn(Rental, "findByPk").mockResolvedValue(mockRental as any);

    const res = await request(app)
      .put("/payments/1")
      .send({ status: PaymentStatus.PAID });

    expect(res.status).toBe(200);
    expect(mockPayment.update).toHaveBeenCalledWith({
      status: PaymentStatus.PAID,
    });
    expect(mockRental.update).toHaveBeenCalled();

    const calledWith = mockRental.update.mock.calls[0][0];
    expect(calledWith.startDate).toBeInstanceOf(Date);
    expect(calledWith.endDate).toBeInstanceOf(Date);
    expect(calledWith.endDate.getTime()).toBeGreaterThan(
      calledWith.startDate.getTime(),
    );
  });
});
