import { Router } from 'express';

import { createTrade, getAllTrades, checkTrade } from '../controllers/tradeController';
import { authMiddleware, isAdminMiddleware } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/trade/[] (Create a trade)
router.post('/', authMiddleware, createTrade);

// GET // http://localhost:3001/api/trade/[] (Get all trades)
router.get('/', authMiddleware, isAdminMiddleware, getAllTrades);

// GET // http://localhost:3001/api/trade/[id] (Check a specific trade)
router.get('/:id', authMiddleware, checkTrade);

export default router;