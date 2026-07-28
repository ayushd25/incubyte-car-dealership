import jwt from "jsonwebtoken";

import { env } from "../config/env";

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret) as {
    id: string;
    role: string;
  };
};

export const generateToken = (
  userId: string,
  role: string
) => {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};