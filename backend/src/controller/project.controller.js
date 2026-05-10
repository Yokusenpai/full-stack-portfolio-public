import { Project } from '../model/project.model.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
    console.log("GET PROJECTS WORK");
  } catch (error) {
    next(error);
    console.log('GET PROJECTSDONT EORKKKKKKWORK');
  }
};
