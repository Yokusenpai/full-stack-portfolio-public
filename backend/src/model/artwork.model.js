import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: String,
      required: true,
    },
    snsLink: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const Artwork = mongoose.model('Artwork', artworkSchema);
