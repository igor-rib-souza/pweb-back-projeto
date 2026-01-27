import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes";
import teapotRoutes from "./routes/teapot.routes";
import categoryRoutes from "./routes/category.routes";
import rentalRoutes from "./routes/rental.routes";
import movieRoutes from "./routes/movie.routes";
import paymentRoutes from "./routes/payment.routes";
import authRoutes from "./routes/auth.routes";

import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { authenticate } from "./middlewares/authMiddleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use("/category", authenticate, categoryRoutes);
app.use("/teapot", authenticate, teapotRoutes);
app.use("/rental", authenticate, rentalRoutes);
app.use("/movie", authenticate, movieRoutes);
app.use("/payments", authenticate, paymentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
