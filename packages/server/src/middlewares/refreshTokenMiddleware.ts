import { NextFunction, Request, Response } from "express";
import { APIResponse, verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils";
import { User } from "../models/User";

import jwt from "jsonwebtoken";
import { env } from "../config/env";
const { JWT_SECRET } = env;

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return APIResponse(res, {clearLocalStorage: true}, 'Missing token', 401);
    }

    try {
        jwt.verify(accessToken, JWT_SECRET);
        return next();
    } catch (err) {
        const userId = verifyRefreshToken(refreshToken);
        if (!userId) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            return APIResponse(res, {clearLocalStorage: true}, 'Invalid Refresh Token', 403);
        }


        const user = await User.findByPk(userId);
        if (!user || user.refresh_token !== refreshToken) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return APIResponse(res, {clearLocalStorage: true}, 'Refresh token invalide', 403);
        }

        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        const id = parseInt(userId);
        await User.update( 
            { refresh_token: newRefreshToken },
            { where: { id: id },},
        );
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000*60*15 //15mn
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000*60*60*24*7 //7j
        });

        next();
    }
}