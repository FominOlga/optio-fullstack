import { z } from "zod";

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),

        email: z.email("Invalid email address"),

        password: z.string().min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),

        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms of use",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    
    password: z.string().min(8, "Password must be at least 8 characters"),
});
