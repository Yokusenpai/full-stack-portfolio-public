import { Resume } from '../model/resume.model.js';
import cloudinary from '../lib/cloudinary.js';

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: 'portfolio/resume',
    });
    return result;
  } catch (error) {
    console.log('error in uploading resume to cloudinary', error);
    throw new Error('Error uploading resume');
  }
};

export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 }).lean();
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.log('Error fetching resume:', error);
    next(error);
  }
};

export const upsertResume = async (req, res, next) => {
  try {
    if (!req.files?.resume) {
      return res.status(400).json({ message: 'Forgot to upload resume' });
    }

    const resumeFile = req.files.resume;
    if (resumeFile.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Resume must be a PDF file' });
    }

    const result = await uploadToCloudinary(resumeFile);
    const existingResume = await Resume.findOne().sort({ createdAt: -1 });

    if (existingResume) {
      if (existingResume.publicId) {
        try {
          await cloudinary.uploader.destroy(existingResume.publicId, {
            resource_type: 'raw',
          });
        } catch (error) {
          console.log('Error deleting old resume from Cloudinary:', error);
        }
      }
      existingResume.fileUrl = result.secure_url;
      existingResume.publicId = result.public_id;
      existingResume.fileName = resumeFile.name;
      await existingResume.save();
      return res.status(200).json(existingResume);
    }

    const resume = new Resume({
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileName: resumeFile.name,
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    console.log('Error uploading resume:', error);
    next(error);
  }
};
