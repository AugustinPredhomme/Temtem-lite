import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { tradeSchema } from '../schemas/trade';
import { Trade } from '../models/Trade';
import { User } from '../models/User';
import { Temtem } from '../models/Temtem';

export const createTrade = async (req: Request, res: Response) => {
    try {
        const validatedTrade = await tradeSchema.validate(req.body);
        const { user_one, user_two, temtem_id } = validatedTrade;

        const [ userOne, userTwo ] = await Promise.all([
            User.findByPk(user_one),
            User.findByPk(user_two)
        ]);

        if (!userOne || !userTwo) {
            return APIResponse(res, [], 'One or both users not found', 400);
        }

        const temtem = await Temtem.findByPk(temtem_id);

        if (!temtem) {
            return APIResponse(res, [], 'Temtem not found', 400);
        }

        //Include Trade logic (remove & add from inventory)
        const newTrade = await Trade.create({ user_one, user_two, temtem_id });
        return APIResponse(res, newTrade, 'Trade created successfully', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating trade', 500);
    }
};

export const getAllTrades = async (req: Request, res: Response) => {
    try {
        const allTrades = await Trade.findAll();
        
        if (!allTrades) {
            return APIResponse(res, [], 'No user found', 400);
        }

        return APIResponse(res, allTrades, 'All trades have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all trades failed', 500);
    }
}

export const checkTrade = async (req: Request, res: Response) => {
    try {
        const id = req.params.tradeId;
        const trade = await Trade.findByPk(id);

        if(!trade) {
            return APIResponse(res, [], 'Trade not found', 400);
        }

        return APIResponse(res, trade, 'Trade checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Trade check failed', 500);
    }
};