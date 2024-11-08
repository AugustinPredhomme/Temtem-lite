import { Router } from 'express';

import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

// POST // http://localhost:3001/api/user/register/[] (Créer un utilisateur)
router.post('/register', registerUser);

// POST // http://localhost:3001/api/user/login/[] (Connecter un utilisateur)
router.post('/login', loginUser);

export default router;