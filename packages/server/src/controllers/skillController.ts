import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { skillSchema } from '../schemas/skill';
import { Skill } from '../models/Skill';

export const createSkill = async (req: Request, res: Response) => {
    try {
        const validatedSkill = await skillSchema.validate(req.body);
        const { name, damage, cooldown } = validatedSkill;
        const existingSkill = await Skill.findOne({ where: { name }});
        if (existingSkill) {
            return APIResponse(res, [], 'Skill already exists', 400);
        }
        const newSkill = await Skill.create({ name, damage, cooldown });
        return APIResponse(res, newSkill, 'Skill created successfully', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating skill', 500);
    }
};

export const getAllSkills = async (req: Request, res: Response) => {
    try {
        const allSkills = await Skill.findAll();
        
        if (!allSkills) {
            return APIResponse(res, [], 'No skill found', 404);
        }
        return APIResponse(res, allSkills, 'All skills have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all skills failed', 500);
    }
}

export const checkSkill = async (req: Request, res: Response) => {
    try {
        const { skillId } = req.params;
        const skill = await Skill.findOne({ where: { id: skillId }});

        if(!skill) {
            return APIResponse(res, [], 'Skill not found', 404);
        }

        return APIResponse(res, skill, 'Skill checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Skill check failed', 500);
    }
};

export const modifySkill = async (req: Request, res: Response) => {
    try {
        const { skillId } = req.params;
        const validatedSkill = await skillSchema.validate(req.body);
        const { name, damage, cooldown } = validatedSkill;
        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return APIResponse(res, skillId, 'Skill not found', 404);
        }
        skill.name = name;
        skill.damage = damage;
        skill.cooldown = cooldown;
        await skill.save()
        return APIResponse(res, skill, 'Skill modified successfully', 200);
    } catch (error) {
        console.error("Skill couldn't be updated: ", error);
    }
};