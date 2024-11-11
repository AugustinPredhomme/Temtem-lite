import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import { User } from "../models/User";
import { Skill } from "../models/Skill";
import { Temtem } from "../models/Temtem";
import { Inventory } from "../models/Inventory";
import { Trade } from "../models/Trade";


export const clearAllData = async (request: Request, response: Response) => {
    try {
        await Promise.all([
            User.destroy({truncate: true}),
            Skill.destroy({ truncate: true }),
            Temtem.destroy({ truncate: true }),
            Inventory.destroy({ truncate: true }),
            Trade.destroy({ truncate: true })
        ]);
        return APIResponse(response, [], 'All data has been deleted');
    } catch (error) {
        console.error('Error while clearing data', error);
    }
};