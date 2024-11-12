import { Request, Response } from 'express';
import { APIResponse } from "../utils";
import { Temtem } from '../models/Temtem';
import { Skill } from '../models/Skill';
import { TemtemSkill } from '../models/TemtemSkill';

export const addSkillToTemtem = async (req: Request, res: Response) => {
    try {
        const { temtemId, skillId } = req.params;
        const temtem = await Temtem.findByPk(temtemId);
        if (!temtem) {
            return APIResponse(res, temtemId, 'Temtem not found', 400);
        }
        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return APIResponse(res, skillId, 'Skill not found', 400);
        }
        const [temtemSkill, created] = await TemtemSkill.findOrCreate({ where: { temtem_id: temtemId, skill_id: skillId }});
        if (!created) {
            console.log(`Temtem ${temtemId} already have the skill ${skillId}`);
        }

        return APIResponse(res, temtemSkill, 'Skill linked to Temtem successfully', 201);
    } catch (error) {
        return APIResponse(res, [], 'Internal server error', 500);
    }
};

export const removeSkillFromTemtem = async (req: Request, res: Response) => {
    try {
        const { temtemId, skillId } = req.params;

        const temtem = await Temtem.findByPk(temtemId);
        if (!temtem) {
            return APIResponse(res, temtemId, 'Temtem not found', 400);
        }

        const skill = await Skill.findByPk(skillId);
        if (!skill) {
            return APIResponse(res, skillId, 'Skill not found', 400);
        }

        await TemtemSkill.destroy({ where: { temtem_id: temtemId, skill_id: skillId }});
        return APIResponse(res, [], 'Skill removed from Temtem successfully', 200);
    } catch (error) {
        return APIResponse(res, [], 'Internal server error', 500);
    }
};

export const getTemtemSkills = async (req: Request, res: Response) => {
    try {
        const { temtemId } = req.params;

        const temtem = await Temtem.findOne({ where: { id: temtemId }, include: [{ model: Skill, through: { attributes: [] }}]});
        if (!temtem) {
            return APIResponse(res, temtemId, 'Temtem not found', 400);
        }

        return APIResponse(res, temtem, 'Temtem skills checked successfully', 200);
    } catch (error) {
        return APIResponse(res, [], 'Internal server error', 500);
    }
};