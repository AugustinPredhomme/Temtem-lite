import { Router } from 'express';

import { createTemtem, getAllTemtems, checkTemtem, modifyTemtem } from '../controllers/temtemController';
import { authMiddleware, isAdminMiddleware } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/temtem/[] (Create a temtem)
router.post('/', authMiddleware, isAdminMiddleware, createTemtem);

// GET // http://localhost:3001/api/temtem/[] (Check all temtems)
router.get('/', authMiddleware, getAllTemtems);

// GET // http://localhost:3001/api/temtem/[id] (Check a specific temtem)
router.get('/:id', authMiddleware, checkTemtem);

// POST // http://localhost:3001/api/temtem/[id] (Modify a specific temtem)
router.post('/:id', authMiddleware, modifyTemtem);

export default router;