// JWT verification
// Attaches req.user

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded === "string") {
            return res.status(401).json({
                error: {
                    type: "AUTH",
                    message: "Invalid token payload",
                },
            });
        }

        req.user = decoded as JwtPayload & { userId: string };
        next();
    } catch {
        return res.status(401).json({ type: "AUTH", message: "Invalid token" });
    }
}
