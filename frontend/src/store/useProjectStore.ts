import { axiosInstance } from '../lib/axios';
import { create } from 'zustand';
import type { Project } from '../types';

interface ProjectStore {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/projects');
      set({ projects: response.data, isLoading: false });
      //
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
