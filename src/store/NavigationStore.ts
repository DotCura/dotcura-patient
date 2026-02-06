// store/NavigationStore.ts
import { create } from 'zustand';

export const useNavigationStore = create(set => ({
  currentRoute: null,
  setCurrentRoute: (route: string) =>
    set({ currentRoute: route }),
}));
