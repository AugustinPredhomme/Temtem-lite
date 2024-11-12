import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Temtem } from './Temtem';
import { Skill } from './Skill';

export interface TemtemSkill {
    temtem_id: number,
    skill_id: number
}

export class TemtemSkill extends Model {}

TemtemSkill.init(
    {
        temtem_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Temtem',
                key: 'id',
            },
        },
        skill_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Skill',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'TemtemSkill',
        tableName: 'temtem_skill',
        timestamps: false,
    }
);

Temtem.belongsToMany(Skill, { through: TemtemSkill, foreignKey: 'temtem_id' });
Skill.belongsToMany(Temtem, { through: TemtemSkill, foreignKey: 'skill_id'  });