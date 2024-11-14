import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

export interface User {
    id: number,
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: string; // user / admin
    birthday?: Date;
    country?: string;
    phone?: string;
    sign_up_date?: Date;
    refresh_token?: string;
}

export class User extends Model {
    static async hashPassword(password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds)
        return hash;
    }
}

User.init(
    {
        id: {
            type:DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        country: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true
            }
        },
        sign_up_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        refresh_token: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await User.hashPassword(user.password);
            }
        }
    }
)