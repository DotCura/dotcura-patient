import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type USERTYPE = 'Customer' | 'Seller' | '';

interface Store {
  hasOnboarded: boolean;
  isLoggedIn: boolean;
  userType: USERTYPE;
  setHasOnboarded: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUserType: (data: USERTYPE) => void;
}

const UsertypeStore = create<Store>()(
  persist(
    set => ({
      hasOnboarded: false,
      isLoggedIn: false,
      userType: '',
      setHasOnboarded: value => set({ hasOnboarded: value }),
      setIsLoggedIn: value => set({ isLoggedIn: value }),
      setUserType: (data: USERTYPE) => set({ userType: data }),
    }),
    {
      name: 'userTypeStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default UsertypeStore;
