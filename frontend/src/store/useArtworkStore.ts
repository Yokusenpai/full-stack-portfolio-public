import { create } from 'zustand';
import type { Artwork } from '../types';
import { axiosInstance } from '../lib/axios';

interface ArtworkStore {
  artworks: Artwork[];
  fetchArtworks: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useArtworkStore = create<ArtworkStore>((set) => ({
  artworks: [],
  isLoading: false,
  error: null,

  fetchArtworks: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/artworks');
      set({ artworks: response.data });
      //
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch artworks',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
