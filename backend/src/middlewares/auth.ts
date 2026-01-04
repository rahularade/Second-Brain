import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface AuthPayload extends JwtPayload {
    userId: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing",
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
        if (!decoded.userId) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default auth;
