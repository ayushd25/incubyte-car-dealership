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

export const login = catchAsync(async (req: Request, res: Response) => {
  const response = await loginUser(req.body);

  return res.status(200).json(response);
});

export const getCurrentUser = (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};