import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),


email: z
    .email({ message: "Invalid email address" }),


  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address or password" }),
  password: z.string().min(8),
});

// Get TypeScript types from Zod schemas:
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;