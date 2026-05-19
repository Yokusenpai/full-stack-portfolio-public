import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    liveUrl: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model('Project', projectSchema);
