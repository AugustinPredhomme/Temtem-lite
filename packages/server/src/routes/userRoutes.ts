import { Router } from 'express';

import { registerUser, loginUser, profile, logout } from '../controllers/userController';
import { authMiddleware, isNotAuthenticated } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/user/register/[] (Create a user)
router.post('/register', isNotAuthenticated, registerUser);

// POST // http://localhost:3001/api/user/login/[] (Connect)
router.post('/login', isNotAuthenticated, loginUser);

// GET // http://localhost:3001/api/user/profile/[id] (Check user infos)
router.get("/profile/:id", authMiddleware, profile);

// GET // http://localhost:3001/api/user/logout/[] (Disconnect)
router.get('/logout', authMiddleware, logout);

export default router;