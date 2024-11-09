import dotenv from 'dotenv';
import { EnvConfig } from '../types/env';

dotenv.config({ path: process.env.NODE_ENV === "test" ? '.env.test': '.env' });

type NODE_ENV = 'production' | 'development' | 'test';

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3001"),

    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',

    NODE_ENV: process.env.NODE_ENV as NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'temtem_lite',
    DB_PORT: parseInt(process.env.DB_PORT || '80')
}