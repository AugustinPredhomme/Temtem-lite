import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface Inventory {
    id: number
    userId: number;
}

export class Inventory extends Model {
}

Inventory.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'User',
            key: 'id'
        }
    },
}, {
  sequelize,
  modelName: 'Inventory',
  tableName: 'inventory',
  timestamps: false,
})