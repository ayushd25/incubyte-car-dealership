import { User } from "../../models/user.model";

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
    throw new Error("EMAIL_ALREADY_EXISTS");
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