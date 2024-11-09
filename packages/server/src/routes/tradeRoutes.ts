import { Router } from 'express';

import { createTrade, checkTrade } from '../controllers/tradeController';
import { authMiddleware } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/trade/[] (Create a trade)
router.post('/', authMiddleware, createTrade);

// GET // http://localhost:3001/api/trade/[id] (Check a specific trade)
router.post('/:id', authMiddleware, checkTrade);

export default router;