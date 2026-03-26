import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../utils/storage';

export type TripType = 'umrah' | 'hajj' | 'undecided';
export type Country =
  | 'russia'
  | 'kazakhstan'
  | 'uzbekistan'
  | 'tajikistan'
  | 'kyrgyzstan'
  | 'other';

interface ProfileState {
  isOnboardingComplete: boolean;
  tripType: TripType | null;
  tripDate: string | null;
  country: Country | null;

  setOnboardingComplete: (v: boolean) => void;
  setTripType: (t: TripType) => void;
  setTripDate: (d: string | null) => void;
  setCountry: (c: Country) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      isOnboardingComplete: false,
      tripType: null,
      tripDate: null,
      country: null,
      setOnboardingComplete: (v) => set({ isOnboardingComplete: v }),
      setTripType: (t) => set({ tripType: t }),
      setTripDate: (d) => set({ tripDate: d }),
      setCountry: (c) => set({ country: c }),
      reset: () =>
        set({
          isOnboardingComplete: false,
          tripType: null,
          tripDate: null,
          country: null,
        }),
    }),
    {
      name: 'bakka-profile',
      storage: createJSONStorage(() => storage),
    }
  )
);
