import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { fightSchema } from '../schemas/fight';
import { Fight } from '../models/Fight';
import { User } from '../models/User';

export const createFight = async (req: Request, res: Response) => {
    try {
        const validatedFight = await fightSchema.validate(req.body);
        const { user_one, user_two, winner } = validatedFight;

        const validUserOne = await User.findByPk(user_one);
        if (!validUserOne) {
            return APIResponse(res, user_one, `User ${user_one} not found`, 400);
        }

        const validUserTwo = await User.findByPk(user_two);
        if (!validUserTwo) {
            return APIResponse(res, user_two, `User ${user_two} not found`, 400);
        }

        if (winner !== user_one && winner !== user_two) {
            return APIResponse(res, null, 'Winner must be one of the participating users', 400);
        }

        const newFight = await Fight.create({ user_one, user_two, winner });
        
        return APIResponse(res, newFight, 'Fight created successfully', 201);
    } catch (error: any) {
        console.error(error);
        return APIResponse(res, null, 'Error creating fight', 500);
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