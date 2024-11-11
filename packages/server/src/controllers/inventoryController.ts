import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { inventorySchema } from '../schemas/inventory';
import { Inventory } from '../models/Inventory';

export const createInventory = async (req: Request, res: Response) => {
    try {
        req.body.user_id = req.params.userId;
        const validatedInventory = await inventorySchema.validate(req.body);
        const { user_id, temtems } = validatedInventory;
        const existingInventory = await Inventory.findOne({ where: { user_id }});
        if (existingInventory) {
            return APIResponse(res, [], 'Inventory already exists', 400);
        }
        const newInventory = await Inventory.create({ user_id, temtems });
        return APIResponse(res, newInventory, 'Inventory created successfully', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating inventory', 500);
    }
};

export const checkInventory = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.userId;
        const inventory = await Inventory.findOne({ where: { user_id }});

        if(!inventory) {
            return APIResponse(res, [], 'Inventory not found', 400);
        }

        return APIResponse(res, inventory, 'Inventory checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Inventory check failed', 500);
    }
};

export const modifyInventory = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.userId;
        const getInventory = await Inventory.findOne({ where: { id: user_id }});
        if (getInventory) {
        const validatedInventory = await inventorySchema.validate(req.body);
        const { user_id, temtems } = validatedInventory;
            const inventory = await Inventory.update( {
                user_id: user_id,
                temtems: temtems
            }, {
                where: { id: user_id },
            },);
            return APIResponse(res, inventory, 'Inventory modified successfully', 200);
        }
        return APIResponse(res, [], 'Inventory not found', 400);
    } catch (error) {
        console.error("Inventory couldn't be updated: ", error);
        return APIResponse(res, [], 'Error modifying inventory', 500);
    }
};