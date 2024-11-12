import { Router } from 'express';

import { authMiddleware} from '../middlewares';
import { createFight, getAllFights } from '../controllers/fightController';

const router = Router();

// POST // http://localhost:3001/api/fight/[] (Create an fight)
router.post('/', authMiddleware, createFight);

// GET // http://localhost:3001/api/fight/[] (Get all fights)
router.get('/', authMiddleware, getAllFights);

export default router;