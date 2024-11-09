import { Router } from 'express';
import { env } from '../config/env';

import userRouter from './userRoutes';
import tradeRouter from './tradeRoutes';
import debugRouter from './debugRoutes';

const { NODE_ENV } = env;

const router = Router();

// http://localhost:3001/api/user/register
router.use('/user', userRouter);
router.use('/trade', tradeRouter);

if (NODE_ENV === "development") {
    router.use('/debug', debugRouter)
}

export default router;