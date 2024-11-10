import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Temtem {
    id: number,
    name: string;
    health: number,
    type_one: string,
    type_two?: string,
    skill_one: number,
    skill_two: number,
    skill_three: number,
    skill_four: number,
}

export class Temtem extends Model {
}

Temtem.init(
    {
        id: {
            type:DataTypes.UUID,
            unique: true,
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
        },
        type_two: {
            type: DataTypes.STRING,
        },
        skill_one: {
            type: DataTypes.UUID,
            allowNull: false
        },
        skill_two: {
            type: DataTypes.UUID,
            allowNull: false
        },
        skill_three: {
            type: DataTypes.UUID,
            allowNull: false
        },
        skill_four: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Temtem',
        tableName: 'temtem',
        timestamps: false,
    }
)