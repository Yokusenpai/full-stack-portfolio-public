import { getProjects } from '../controller/project.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getProjects);
export default router;
