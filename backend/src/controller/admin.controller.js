import { Project } from '../model/project.model.js';
import { Artwork } from '../model/artwork.model.js';
import cloudinary from '../lib/cloudinary.js';

export const checkAdmin = async (req, res, next) => {};

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });
    return result;

    //
  } catch (error) {
    console.log('error in uploading file to cloudinary', error);
    throw new Error('Error uploading ');
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!req.files.image) {
      return res
        .status(400)
        .json({ message: 'Forgot to Upload project Image' });
    }

    const { title, desc, tags, liveUrl = '', githubUrl } = req.body;

    const imageUrl = await uploadToCloudinary(req.files.image);
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    const project = new Project({
      title,
      desc,
      tags: tagsArray,
      imageUrl: imageUrl.secure_url,
      liveUrl,
      githubUrl,
      publicId: imageUrl.public_id,
    });
    await project.save();
    res.status(201).json(project);
    //
  } catch (error) {
    console.log('Error in project creation: ', error);
    next(error);
  }
};

export const createArtwork = async (req, res, next) => {
  try {
    if (!req.files.image) {
      return res.status(400).json({ message: 'forgot to upload artwork' });
    }
    const { snsLink = '', aspectRatio } = req.body;
    const imageUrl = await uploadToCloudinary(req.files.image);

    const artwork = new Artwork({
      imageUrl: imageUrl.secure_url,
      snsLink,
      aspectRatio,
      publicId: imageUrl.public_id,
    });

    await artwork.save();
    res.status(201).json(artwork);
    //
  } catch (error) {
    console.log('Error in creating Artwork: ', error);
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (project.publicId) await cloudinary.uploader.destroy(project.publicId);

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted' });
    //
  } catch (error) {
    console.log('error in deleting project: ', error);
    next(error);
  }
};

export const deleteArtwork = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id);
    if (artwork.publicId) await cloudinary.uploader.destroy(artwork.publicId);

    await artwork.deleteOne();
    res.status(200).json({ message: 'Art deleted' });
    //
  } catch (error) {
    console.log('error in deleting art: ', error);
    next(error);
  }
};
