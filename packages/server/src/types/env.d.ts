export interface EnvConfig {
    PORT: number;

    JWT_SECRET: string;
    JWT_EXPIRATION: string;

    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRATION: string;

    NODE_ENV: 'development' | 'production' | 'test';
    FRONTEND_URL: string;

    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;
}