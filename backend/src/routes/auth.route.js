import { Router } from 'express';
import { protectRoute, checkAuth } from '../middleware/auth.middleware.js';
import { login } from '../controller/auth.controller.js';

const router = Router();

router.get('/check', protectRoute, checkAuth);
router.post('/login', login);

export default router;
