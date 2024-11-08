import { Sequelize } from 'sequelize';
import { env } from './env';

const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = env;

//Connect DB
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});