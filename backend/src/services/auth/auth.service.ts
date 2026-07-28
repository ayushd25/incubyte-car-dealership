import { User } from "../../models/user.model";
import { AppError } from "../../errors/AppError";
import { generateToken } from "../../utils/jwt";
import { buildAuthResponse } from "../../utils/authResponse";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserInput) => {
  // Business rule
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate JWT
  const token = generateToken(
    user._id.toString(),
    user.role
  );

  return buildAuthResponse(
  user,
  token,
  "User registered successfully"
);
};

import bcrypt from "bcrypt";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  return buildAuthResponse(
  user,
  token,
  "Login successful"
);
};