import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Temtem {
    id: number,
    name: string;
    health: number,
    type_one: string,
}

export class Temtem extends Model {
}

Temtem.init(
    {
        id: {
            type:DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        health: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        type_one: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Temtem',
        tableName: 'temtem',
        timestamps: false,
    }
)