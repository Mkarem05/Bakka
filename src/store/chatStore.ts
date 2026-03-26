import { create } from 'zustand';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  messages: ChatMessage[];

  addMessage: (msg: ChatMessage) => void;
  clear: () => void;
}

const MAX_MESSAGES = 20;

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],

  addMessage: (msg) =>
    set((s) => {
      const updated = [...s.messages, msg];
      return { messages: updated.slice(-MAX_MESSAGES) };
    }),

  clear: () => set({ messages: [] }),
}));
