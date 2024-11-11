import { Router } from 'express';

import { authMiddleware, isAdminMiddleware } from '../middlewares';
import { createSkill, getAllSkills, checkSkill, modifySkill } from '../controllers/skillController';

const router = Router();

// POST // http://localhost:3001/api/skill/[] (Create a skill)
router.post('/', authMiddleware, isAdminMiddleware, createSkill);

// GET // http://localhost:3001/api/skill/[] (Get all skills)
router.get('/', authMiddleware, getAllSkills);

// GET // http://localhost:3001/api/trade/[id] (Check a specific skill)
router.get('/:id', authMiddleware, checkSkill);

// POST // http://localhost:3001/api/skill/[id] (Modify a skill)
router.post('/:id', authMiddleware, isAdminMiddleware, modifySkill);

export default router;