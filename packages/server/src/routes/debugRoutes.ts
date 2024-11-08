import { Router } from 'express';
import { clearAllData } from '../controllers/debugController';

const router = Router();

// GET http://localhost/api/debug/clear (Tout effacer)
router.get('/clear', clearAllData);

export default router;