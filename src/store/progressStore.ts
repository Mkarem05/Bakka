import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../utils/storage';

interface ProgressState {
  umrahCompleted: number[];
  hajjCompleted: number[];

  markUmrahDone: (id: number) => void;
  unmarkUmrah: (id: number) => void;
  isUmrahDone: (id: number) => boolean;

  markHajjDone: (id: number) => void;
  unmarkHajj: (id: number) => void;
  isHajjDone: (id: number) => boolean;

  resetAll: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      umrahCompleted: [],
      hajjCompleted: [],

      markUmrahDone: (id) =>
        set((s) =>
          s.umrahCompleted.includes(id)
            ? s
            : { umrahCompleted: [...s.umrahCompleted, id] }
        ),
      unmarkUmrah: (id) =>
        set((s) => ({ umrahCompleted: s.umrahCompleted.filter((x) => x !== id) })),
      isUmrahDone: (id) => get().umrahCompleted.includes(id),

      markHajjDone: (id) =>
        set((s) =>
          s.hajjCompleted.includes(id)
            ? s
            : { hajjCompleted: [...s.hajjCompleted, id] }
        ),
      unmarkHajj: (id) =>
        set((s) => ({ hajjCompleted: s.hajjCompleted.filter((x) => x !== id) })),
      isHajjDone: (id) => get().hajjCompleted.includes(id),

      resetAll: () => set({ umrahCompleted: [], hajjCompleted: [] }),
    }),
    {
      name: 'bakka-progress',
      storage: createJSONStorage(() => storage),
    }
  )
);
