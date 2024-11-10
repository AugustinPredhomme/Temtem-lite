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
            unique: true,
            primaryKey: true
        },
        user_one: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_two: {
            type: DataTypes.UUID
        },
        winner: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Fight',
        tableName: 'fight',
        timestamps: false,
    }
)