import { User } from "../../models/user.model";
import { AppError } from "../../errors/AppError";

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

  const user = await User.create({
    name,
    email,
    password,
  });

  return {
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};