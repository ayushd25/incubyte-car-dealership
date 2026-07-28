import { User } from "../../models/user.model";
import { AppError } from "../../errors/AppError";
import { generateToken } from "../../utils/jwt";

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

  return {
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  };
};