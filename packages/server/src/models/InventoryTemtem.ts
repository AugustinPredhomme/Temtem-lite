import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Inventory } from './Inventory';
import { Temtem } from './Temtem';

export class InventoryTemtem extends Model {}

InventoryTemtem.init({
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Inventory',
      key: 'id',
    },
  },
  temtem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Temtem',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'InventoryTemtem',
  tableName: 'inventory_temtem',
  timestamps: false
});

Inventory.belongsToMany(Temtem, { through: InventoryTemtem, foreignKey: 'inventory_id' });
Temtem.belongsToMany(Inventory, { through: InventoryTemtem, foreignKey: 'temtem_id' });