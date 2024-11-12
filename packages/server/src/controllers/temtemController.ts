import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { temtemSchema } from '../schemas/temtem';
import { Temtem } from '../models/Temtem';
import { Op } from 'sequelize';

export const createTemtem = async (req: Request, res: Response) => {
    try {
        const validatedTemtem = await temtemSchema.validate(req.body);
        const { name, health, type_one} = validatedTemtem;
        const existingTemtem = await Temtem.findOne({ where: { name }});
        if (existingTemtem) {
            return APIResponse(res, [], 'Temtem already exists', 400);
        }
        const newTemtem = await Temtem.create({ name, health, type_one });
        return APIResponse(res, newTemtem, 'Temtem created successfully', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating temtem', 500);
    }
};

export const getAllTemtems = async (req: Request, res: Response) => {
    try {
        const allTemtems = await Temtem.findAll();
        
        if (!allTemtems) {
            return APIResponse(res, [], 'No temtem found', 400);
        }
        return APIResponse(res, allTemtems, 'All temtems have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all temtems failed', 500);
    }
}

export const checkTemtem = async (req: Request, res: Response) => {
    try {
        const { temtemId } = req.params;
        const temtem = await Temtem.findOne({ where: { id: temtemId }});

        if(!temtem) {
            return APIResponse(res, [], 'Temtem not found', 400);
        }

        return APIResponse(res, temtem, 'Temtem checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Temtem check failed', 500);
    }
};

export const modifyTemtem = async (req: Request, res: Response) => {
    try {
        const { temtemId } = req.params;
        const validatedSkill = await temtemSchema.validate(req.body);
        const { name, health, type_one } = validatedSkill;
        const temtem = await Temtem.findByPk(temtemId);
        if (!temtem) {
            return APIResponse(res, temtemId, 'Temtem not found', 400);
        }
        temtem.name = name;
        temtem.health = health;
        temtem.type_one = type_one;
        await temtem.save()
        return APIResponse(res, temtem, 'Temtem modified successfully', 200);
    } catch (error) {
        console.error("Temtem couldn't be updated: ", error);
    }
};