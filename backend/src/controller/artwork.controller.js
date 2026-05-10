import { Artwork } from '../model/artwork.model.js';

export const getArtworks = async (req, res, next) => {
  try {
    const artwork = await Artwork.find();
    res.json(artwork);
  } catch (error) {
    next(error);
  }
};
