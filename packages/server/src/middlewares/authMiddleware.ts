import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/response";

const { JWT_SECRET } = env;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return APIResponse(res, null, "You must be connected to access this page", 401);
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        res.locals.user = decoded;
        next();
    } catch (err: any) {
        console.log('Error when verifying token: ')
        return APIResponse(res, null, 'Invalid Token', 401);
    }
};