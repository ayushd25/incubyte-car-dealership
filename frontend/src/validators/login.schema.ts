import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;