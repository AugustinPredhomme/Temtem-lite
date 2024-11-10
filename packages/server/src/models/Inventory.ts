import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Inventory {
    id: number,
    user_id: number,
    temtems: Array<number>,
}

export class Inventory extends Model {
}

Inventory.init(
    {
        id: {
            type:DataTypes.UUID,
            unique: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        temtems: {
            type: DataTypes.ARRAY(DataTypes.NUMBER),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventory',
        timestamps: false,
    }
)