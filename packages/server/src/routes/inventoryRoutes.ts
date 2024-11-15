import { Router } from 'express';

import { authMiddleware, isAdminMiddleware } from '../middlewares';
import { addTemtemToInventory, checkAllInventories, checkInventory, deleteTemtemFromInventory } from '../controllers/inventoryController';

const router = Router();

// POST // http://localhost:3001/api/inventory/[] (Create an inventory or Add temtem to inventory)
router.post('/', authMiddleware, addTemtemToInventory);

// GET // http://localhost:3001/api/inventory/[id] (Check a specific inventory)
router.get('/:userId', authMiddleware, checkInventory);

// GET // http://localhost:3001/api/inventory/[] (Check all inventories)
router.get('/', authMiddleware, checkAllInventories);

// POST // http://localhost:3001/api/inventory/[userId]/[temtemId] (Modify a specific inventory)
router.delete('/:userId/:temtemId', authMiddleware, deleteTemtemFromInventory);

export default router;