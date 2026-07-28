import { Request, Response } from "express";
import { registerUser } from "../../services/auth/auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  return res.status(201).json(result);
};