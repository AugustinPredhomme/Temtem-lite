import { Router } from 'express';

import { authMiddleware} from '../middlewares';
import { createFight, getAllFights, checkFight } from '../controllers/fightController';

const router = Router();

// POST // http://localhost:3001/api/fight/[] (Create an fight)
router.post('/', authMiddleware, createFight);

// GET // http://localhost:3001/api/fight/[] (Get all fights)
router.get('/', authMiddleware, getAllFights);

// GET // http://localhost:3001/api/fight/[id] (Check a specific fight)
router.get('/:fightId', authMiddleware, checkFight);

export default router;