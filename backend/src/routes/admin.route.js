import Router from 'express';
import {
  checkAdmin,
  createArtwork,
  createProject,
  deleteArtwork,
  deleteProject,
} from '../controller/admin.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/artworks', protectRoute, createArtwork);
router.post('/projects', protectRoute, createProject);

router.delete('/artworks/:id', protectRoute, deleteArtwork);
router.delete('/projects/:id', protectRoute, deleteProject);

export default router;
