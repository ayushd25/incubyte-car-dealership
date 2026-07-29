import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters"),

  email: z.email("Enter a valid email"),

  password: z.string().min(6, "Minimum 6 characters"),
});

export type RegisterFormData =
  z.infer<typeof registerSchema>;