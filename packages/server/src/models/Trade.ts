import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Trade {
    id: number,
    user_one: number,
    user_two: number
    temtem_id: number
}

export class Trade extends Model {
}

Trade.init(
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
        temtem_id: {
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Trade',
        tableName: 'trade',
        timestamps: false,
    }
)