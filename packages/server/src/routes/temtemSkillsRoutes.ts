import { Router } from 'express';

import { addSkillToTemtem, removeSkillFromTemtem, getTemtemSkills } from '../controllers/temtemSkillController';
import { authMiddleware, isAdminMiddleware } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/temtem/[temtemId]/[skillId] (Add a skill to a temtem)
router.post('/:temtemId/skill/:skillId', authMiddleware, isAdminMiddleware, addSkillToTemtem);

// POST // http://localhost:3001/api/temtem/[id] (Remove a skill from a temtem)
router.delete('/:temtemId/skill/:skillId', authMiddleware, isAdminMiddleware, removeSkillFromTemtem);

// GET // http://localhost:3001/api/temtem/[id]/skill/[] (Get all temtem skills)
router.get('/:temtemId/skill/', authMiddleware, getTemtemSkills);

export default router;