
import { create } from 'zustand';

interface ChatState {
  isChatbotOpen: boolean;
  setChatbotOpen: (isOpen: boolean) => void;
  prefilledQuery: string;
  setPrefilledQuery: (query: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isChatbotOpen: false,
  setChatbotOpen: (isOpen) => set({ isChatbotOpen: isOpen }),
  prefilledQuery: '',
  setPrefilledQuery: (query) => set({ prefilledQuery: query }),
}));
