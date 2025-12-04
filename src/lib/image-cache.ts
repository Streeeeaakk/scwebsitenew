
import { create } from 'zustand';

interface ImageStore {
  images: Record<string, string>;
  setImage: (key: string, url: string) => void;
  setImages: (images: Record<string, string>) => void;
}

// Zustand store for reactive updates
export const useImageStore = create<ImageStore>((set) => ({
  images: {},
  setImage: (key, url) => set((state) => ({
    images: { ...state.images, [key]: url }
  })),
  setImages: (images) => set({ images }),
}));

    