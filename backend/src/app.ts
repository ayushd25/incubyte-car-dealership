import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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

export default app;