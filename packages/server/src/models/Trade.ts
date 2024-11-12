import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Temtem } from './Temtem';

export interface Trade {
    id: number,
    user_one: number,
    user_two: number
    temtem_id: number
    time:Date
}

export class Trade extends Model {
}

Trade.init(
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
        temtem_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: 'Temtem',
                key: 'id',
            }
        },
        time: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Trade',
        tableName: 'trade',
        timestamps: false,
    }
)

User.belongsToMany(User, { through: Trade, foreignKey: 'user_one', as: 'giver' });
User.belongsToMany(Temtem, { through: Trade, foreignKey: 'user_two', as: 'receiver' });
Temtem.belongsToMany(User, { through: Trade, foreignKey: 'temtem_id' });
