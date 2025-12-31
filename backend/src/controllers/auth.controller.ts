import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import * as authService from "../services/auth.service";

/* This controller handles user registration and login:
    Read req.body
    Validate input with Zod  
    Call the service     
    Return HTTP responses
*/

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = registerSchema.parse(req.body);

    const result = await authService.register(input);

    res.status(201).json({
      data: result,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
