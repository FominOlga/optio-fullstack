import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import * as authService from "../services/auth.service";

/* This controller handles user registration and login:
    Read req.body
    Validate input with Zod  
    Call the service     
    Return HTTP responses
*/

export const register = async (req: Request, res: Response, next: NextFunction) => {
    console.log("REGISTER HIT", req.body);
    try {
        const input = registerSchema.parse(req.body);
        console.log("Register payload on backend:", input);
        const result = await authService.register(input);

        res.status(201).json({
            data: result,
            error: null,
        });
    } catch (err) {
        console.error("Error in register controller:", err);
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = loginSchema.parse(req.body);

        const result = await authService.login(input);

        res.status(200).json({
            data: result,
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (_req: Request, res: Response) => {
    // For stateless JWT, nothing to invalidate yet
    // TO-DO: add refresh tokens, delete refresh token from DB, clear cookie, prevent silent re-login
    return res.status(200).json({
        message: "Logged out successfully",
    });
};
