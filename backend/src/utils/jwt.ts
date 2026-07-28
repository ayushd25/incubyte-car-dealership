import jwt from "jsonwebtoken";
console.log("JWT_SECRET:", process.env.JWT_SECRET);
export const generateToken = (
  userId: string,
  role: string
) => {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};