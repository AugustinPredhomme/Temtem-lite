import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { sequelize } from '../config/database';
import { tradeSchema } from '../schemas/trade';
import { Trade } from '../models/Trade';
import { User } from '../models/User';
import { Temtem } from '../models/Temtem';
import { InventoryTemtem } from '../models/InventoryTemtem';
import { Inventory } from '../models/Inventory';

export const createTrade = async (req: Request, res: Response) => {
    try {
        const validatedSkill = await tradeSchema.validate(req.body);
        const { user_one, user_two, temtem_id } = validatedSkill;

        const userOne = await User.findByPk(user_one);
        if (!userOne) {
        return APIResponse(res, user_one, 'User one not found', 400);
        }

        const userTwo = await User.findByPk(user_two);
        if (!userTwo) {
        return APIResponse(res, user_two, 'User two not found', 400);
        }

        const temtem = await Temtem.findByPk(temtem_id);
        if (!temtem) {
        return APIResponse(res, temtem_id, 'Temtem not found', 400);
        }

        const userOneInventory = await Inventory.findOne({ where: { user_id: user_one } });
        if (!userOneInventory) {
        return APIResponse(res, [], `User ${user_one} inventory not found`, 400);
        }

        const [userTwoInventory] = await Inventory.findOrCreate({ where: { user_id: user_two } });

        const userOneInventoryTemtem = await InventoryTemtem.findOne({ where: { inventory_id: userOneInventory.id, temtem_id } });
        if (!userOneInventoryTemtem) {
        return APIResponse(res, [], `Temtem not found in user ${user_one} inventory`, 400);
        }

        const [userTwoInventoryTemtem, create] = await InventoryTemtem.findOrCreate({ where: { inventory_id: userTwoInventory.id, temtem_id } });
        if (!create) {
            return APIResponse(res, [], `User ${user_two} already have this temtem`, 400);
        }

        await userOneInventoryTemtem.destroy();

        const trade = await Trade.create({ user_one, user_two, temtem_id, time: Date.now() });

        return APIResponse(res, trade, 'Trade created successfully', 201);
    } catch (error) {
        return APIResponse(res, error, 'Internal server error', 500);
    }
}

export const getAllTrades = async (req: Request, res: Response) => {
    try {
        const allTrades = await Trade.findAll({
            attributes: ['id', 'user_one', 'user_two', 'temtem_id', 'time'],
          });
  
      if (!allTrades) {
        return APIResponse(res, [], 'No trades found', 400);
      }
  
      return APIResponse(res, allTrades, 'All trades have been returned', 200);
    } catch (error: any) {
      console.log(error);
      return APIResponse(res, [], 'Get all trades failed', 500);
    }
  };