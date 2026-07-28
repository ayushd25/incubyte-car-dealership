import { Request, Response } from "express";
import { registerUser } from "../../services/auth/auth.service";

export const register = (_req: Request, res: Response) => {
  const result = registerUser();

  return res.status(201).json(result);
};