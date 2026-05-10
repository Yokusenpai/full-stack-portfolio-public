import { getArtworks } from '../controller/artwork.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getArtworks);
export default router;
