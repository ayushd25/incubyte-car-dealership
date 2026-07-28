import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

startServer();