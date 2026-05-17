import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: false,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Resume = mongoose.model('Resume', resumeSchema);
