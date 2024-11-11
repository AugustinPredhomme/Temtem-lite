import { Router } from 'express';

import { authMiddleware, isAdminMiddleware } from '../middlewares';
import { createInventory, checkInventory, modifyInventory } from '../controllers/inventoryController';

const router = Router();

// POST // http://localhost:3001/api/inventory/[] (Create an inventory)
router.post('/', authMiddleware, isAdminMiddleware, createInventory);

// GET // http://localhost:3001/api/inventory/[id] (Check a specific inventory)
router.get('/:userId', authMiddleware, checkInventory);

// POST // http://localhost:3001/api/inventory/[id] (Modify a specific inventory)
router.post('/:userId', authMiddleware, modifyInventory);

export default router;