import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { env } from "../config/env";
import { User } from "../models/user.model";

interface JwtPayload {
  id: string;
  role: string;
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      env.jwtSecret
    ) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
};