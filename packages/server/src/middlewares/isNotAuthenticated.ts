import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/response";

const { JWT_SECRET } = env;

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return next();
    try {
        jwt.verify(accessToken, JWT_SECRET);
        return APIResponse(res, null, 'You cannot access this resource', 401);
    } catch (err) {
        res.clearCookie('accessToken');
        next();
    }
};