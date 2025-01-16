import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { Inventory } from '../models/Inventory';
import { InventoryTemtem } from '../models/InventoryTemtem';
import { Temtem } from '../models/Temtem';

export const addTemtemToInventory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;
        const { temtemIds } = req.body;

        if (userId===undefined) {
            return APIResponse(res, [], 'UserID must be defined', 400);
        }
        const user_idQuery = parseInt(userId.toString());
        const [newInventory, created] = await Inventory.findOrCreate({ where: { user_id: user_idQuery }, defaults: { user_id: user_idQuery }});
        for (const temtemId of temtemIds) {
            const temtem = await Temtem.findByPk(temtemId);
            if (!temtem) {
                return APIResponse(res, [], 'Temtem not found', 404);
            }

            const [inventoryTemtem, temtemCreated] = await InventoryTemtem.findOrCreate({
                where : { inventory_id: newInventory.id, temtem_id: temtemId },
                defaults: { inventory_id: newInventory.id, temtem_id: temtemId }
            });

            if (!temtemCreated) {
                console.log(`Temtem ${temtemId} already exists in inventory ${newInventory.id}`);
            }
        }
        return APIResponse(res, newInventory, 'Inventory created successfully', created ? 201 : 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating inventory', 500);
    }
};

export const checkInventory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const inventory = await Inventory.findOne({ where: { user_id: userId }, include: [{ model: Temtem, through: { attributes: [] }}]});

        if(!inventory) {
            return APIResponse(res, [], 'Inventory not found', 404);
        }
        return APIResponse(res, inventory, 'Inventory checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Inventory check failed', 500);
    }
};

export const checkAllInventories = async (req: Request, res: Response) => {
    try {
      const inventories = await Inventory.findAll({
        include: [{ model: Temtem, through: { attributes: [] } }]
      });
      
      const filteredInventories = inventories.filter(inventory => inventory.Temtems && inventory.Temtems.length > 1);
  
      return APIResponse(res, filteredInventories, 'Inventories fetched', 200);
    } catch (error) {
      console.error(error);
      return APIResponse(res, [], 'Error fetching inventories', 500);
    }
  };
  
  

export const deleteTemtemFromInventory = async (req: Request, res: Response) => {
    try {
        const  { userId, temtemId } = req.params;
        const inventory = await Inventory.findOne({ where: { user_id: userId }});

        if (!inventory) {
            return APIResponse(res, [], 'Inventory not found', 404);
        }

        await InventoryTemtem.destroy({ where: { inventory_id: inventory.id, temtem_id: temtemId }});

        return APIResponse(res, temtemId, 'Temtem removed from inventory', 200);
    } catch (error) {
        console.error("Inventory couldn't be deleted: ", error);
        return APIResponse(res, [], 'Internal server error', 500);
    }
};