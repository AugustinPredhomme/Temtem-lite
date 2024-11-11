import { Router } from 'express';

import { registerUser, loginUser, getAllUsers, checkProfile, modifyProfile, logout } from '../controllers/userController';
import { authMiddleware, isAdminMiddleware, isNotAuthenticated } from '../middlewares';

const router = Router();

// POST // http://localhost:3001/api/user/register/[] (Create a user)
router.post('/register', isNotAuthenticated, registerUser);

// POST // http://localhost:3001/api/user/login/[] (Connect)
router.post('/login', isNotAuthenticated, loginUser);

// GET // http://localhost:3001/api/user/[] (Get all users)
router.get('/', authMiddleware, isAdminMiddleware, getAllUsers);

// GET // http://localhost:3001/api/user/profile/[id] (Check user infos)
router.get("/profile/:userId", authMiddleware, checkProfile);

// POST // http://localhost:3001/api/user/profile/[id] (Modify user infos)
router.post("/profile/:userId", authMiddleware, modifyProfile);

// POST // http://localhost:3001/api/user/logout/[] (Disconnect)
router.post('/logout', authMiddleware, logout);

export default router;