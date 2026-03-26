import { create } from 'zustand';
import { PrayerData } from '../services/prayerService';

interface PrayerState {
  data: PrayerData | null;
  loading: boolean;
  error: boolean;

  setData: (data: PrayerData) => void;
  setLoading: (v: boolean) => void;
  setError: (v: boolean) => void;
}

export const usePrayerStore = create<PrayerState>()((set) => ({
  data: null,
  loading: false,
  error: false,

  setData: (data) => set({ data, loading: false, error: false }),
  setLoading: (v) => set({ loading: v }),
  setError: (v) => set({ error: v, loading: false }),
}));
