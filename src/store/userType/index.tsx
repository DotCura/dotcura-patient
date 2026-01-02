import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Store {
  hasOnboarded: boolean;
  isLoggedIn: boolean;
  setHasOnboarded: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
}

const UsertypeStore = create<Store>()(
  persist(
    set => ({
      hasOnboarded: false,
      isLoggedIn: false,
      userType: '',
      setHasOnboarded: value => set({ hasOnboarded: value }),
      setIsLoggedIn: value => set({ isLoggedIn: value }),
    }),
    {
      name: 'userTypeStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default UsertypeStore;
