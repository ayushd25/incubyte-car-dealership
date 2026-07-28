import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "../../services/auth/auth.service";
import { catchAsync } from "../../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  return res.status(201).json(result);
});

export const login = catchAsync(async (req, res) => {
  const response = await loginUser(req.body);

  res.status(200).json(response);
});