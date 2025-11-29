import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import teapotRoutes from "./routes/teapot.routes";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Servidor funcionando!");
});

app.use("/users", userRoutes);
app.use("/teapot", teapotRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
