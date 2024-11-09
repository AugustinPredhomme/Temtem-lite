import jwt from "jsonwebtoken";
import { env } from "../config/env";

const { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION } = env;

export const generateAccessToken = (userId: any): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const generateRefreshToken = (userId: any): string => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}

export const verifyRefreshToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
        return decoded.userId;
    } catch (err: any) {
        console.log('Refresh Token invalide');
        return null;
    }
}