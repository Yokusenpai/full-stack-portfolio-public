import Router from "express";
import { checkAdmin, createArtwork, createProject, deleteArtwork, deleteProject } from "../controller/admin.controller.js";



const router = Router();

router.get("/check", checkAdmin);

router.post('/artworks', createArtwork);
router.delete('/artworks/:id', deleteArtwork);

router.post('/projects', createProject);
router.delete('/projects/:id', deleteProject);
export default router;