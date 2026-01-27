import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
  patientId: string | null;
  isLoggedIn: boolean;

  setPatientId: (id: string | null) => void;
  logout: () => void;
}

const UserStore = create<UserStore>()(
  persist(
    set => ({
      patientId: null,
      isLoggedIn: false,

      setPatientId: id =>
        set({
          patientId: id,
          isLoggedIn: !!id,
        }),

      logout: () =>
        set({
          patientId: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default UserStore;
