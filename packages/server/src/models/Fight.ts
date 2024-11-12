import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Fight {
    id: number,
    user_one: number,
    user_two: number
    winner: number
}

export class Fight extends Model {
}

Fight.init(
    {
        id: {
            type:DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true
        },
        user_one: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            }
        },
        user_two: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            }
        },
        winner: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            }
        }
    }, {
        sequelize,
        modelName: 'Fight',
        tableName: 'fight',
        timestamps: false,
    }
)