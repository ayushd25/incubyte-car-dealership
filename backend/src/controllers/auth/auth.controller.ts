import { Request, Response } from "express";
import { registerUser } from "../../services/auth/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};