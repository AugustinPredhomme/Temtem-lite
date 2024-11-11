import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { fightSchema } from '../schemas/fight';
import { Fight } from '../models/Fight';

export const createFight = async (req: Request, res: Response) => {
    try {
        const validatedFight = await fightSchema.validate(req.body);
        const { user_one, user_two, winner } = validatedFight;
        const newFight = await Fight.create({ user_one, user_two, winner });
        return APIResponse(res, newFight, 'Fight created successfully', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating fight', 500);
    }
};

export const getAllFights = async (req: Request, res: Response) => {
    try {
        const allFights = await Fight.findAll();
        if (!allFights) {
            return APIResponse(res, [], 'No fight found', 400);
        }
        return APIResponse(res, allFights, 'All fights have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all skills failed', 500);
    }
}

export const checkFight = async (req: Request, res: Response) => {
    try {
        const id = req.params.fightId;
        const fight = await Fight.findOne({ where: { id: id }});

        if(!fight) {
            return APIResponse(res, [], 'Fight not found', 400);
        }

        return APIResponse(res, fight, 'Fight checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Fight check failed', 500);
    }
};