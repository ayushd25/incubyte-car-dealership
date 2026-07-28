import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import helmet from "helmet";
import "./config/env";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Incubyte Car Dealership API",
  });
});
app.use(errorHandler);

export default app;