import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Skill {
    id: number,
    name: string,
    damage: number,
    cooldown: number
}

export class Skill extends Model {
}

Skill.init(
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
        damage: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        cooldown: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Skill',
        tableName: 'skill',
        timestamps: false,
    }
)