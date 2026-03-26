import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../utils/storage';

interface ChecklistState {
  completed: string[];

  toggle: (id: string) => void;
  isChecked: (id: string) => boolean;
  reset: () => void;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      completed: [],

      toggle: (id) =>
        set((s) =>
          s.completed.includes(id)
            ? { completed: s.completed.filter((x) => x !== id) }
            : { completed: [...s.completed, id] }
        ),
      isChecked: (id) => get().completed.includes(id),
      reset: () => set({ completed: [] }),
    }),
    {
      name: 'bakka-checklist',
      storage: createJSONStorage(() => storage),
    }
  )
);
