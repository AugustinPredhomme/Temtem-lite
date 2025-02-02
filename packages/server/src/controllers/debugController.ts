import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import { User } from "../models/User";
import { Skill } from "../models/Skill";
import { Temtem } from "../models/Temtem";
import { Inventory } from "../models/Inventory";
import { Trade } from "../models/Trade";
import { InventoryTemtem } from "../models/InventoryTemtem";
import { TemtemSkill } from "../models/TemtemSkill";
import { Fight } from "../models/Fight";


export const clearAllData = async (request: Request, response: Response) => {
    try {
        await Promise.all([
            User.destroy({truncate: true}),
            Skill.destroy({ truncate: true }),
            Temtem.destroy({ truncate: true }),
            TemtemSkill.destroy({ truncate: true }),
            Inventory.destroy({ truncate: true }),
            InventoryTemtem.destroy({ truncate: true }),
            Trade.destroy({ truncate: true }),
            Fight.destroy({truncate: true})
        ]);
        return APIResponse(response, [], 'All data has been deleted');
    } catch (error) {
        console.error('Error while clearing data', error);
    }
};