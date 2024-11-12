import { Router } from 'express';
import { env } from '../config/env';

import userRouter from './userRoutes';
import skillRouter from './skillRoutes';
import temtemRouter from './temtemRoutes';
import temtemSkillRouter from './temtemSkillsRoutes';
import inventoryRouter from './inventoryRoutes';
import tradeRouter from './tradeRoutes';
import fightRouter from './fightRoutes';
import debugRouter from './debugRoutes';

const { NODE_ENV } = env;

const router = Router();

// http://localhost:3001/api/user
router.use('/user', userRouter);

// http://localhost:3001/api/skill
router.use('/skill', skillRouter);

// http://localhost:3001/api/temtem
router.use('/temtem', temtemRouter);

// http://localhost:3001/api/temtem
router.use('/temtemSkill', temtemSkillRouter);

// http://localhost:3001/api/inventory
router.use('/inventory', inventoryRouter);

// http://localhost:3001/api/trade
router.use('/trade', tradeRouter);

// http://localhost:3001/api/fight
router.use('/fight', fightRouter);

if (NODE_ENV === "development") {
    // http://localhost:3001/api/debug
    router.use('/debug', debugRouter)
}

export default router;