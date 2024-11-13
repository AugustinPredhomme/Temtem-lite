import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { Temtem } from './Temtem';

export interface Inventory {
    id: number
    userId: number;
    Temtems?: Temtem[];
}

export class Inventory extends Model {
  static associations: {
    Temtems: Association<Inventory,Temtem>;
  }
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

Inventory.belongsToMany(Temtem, { through: 'InventoryTemtem', foreignKey: 'inventory_id' });
Temtem.belongsToMany(Inventory, { through: 'InventoryTemtem', foreignKey: 'temtem_id' });