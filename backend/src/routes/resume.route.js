import { Router } from 'express';
import { getResume, upsertResume } from '../controller/resume.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getResume);
router.post('/', protectRoute, upsertResume);

export default router;
