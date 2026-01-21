import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartStore {
  cartCount: number;
  notificationCount: number;
  cartKitIds: number[];

  addKit: (id: number) => void;
  removeKit: (id: number) => void;

  setCartCount: (count: number) => void;
  setNotificationCount: (count: number) => void;

  increment: () => void;
  decrement: () => void;
  resetCart: () => void;
  resetNotificationCount: () => void;
}

export const CartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartCount: 0,
      notificationCount: 0,
      cartKitIds: [],

      setCartCount: (count: number) => set({ cartCount: count }),

      setNotificationCount: (count: number) =>
        set({ notificationCount: count }),

      addKit: (id: number) =>
        set(state => {
          const kitId = Number(id);

          if (state.cartKitIds.includes(kitId)) {
            return state;
          }

          const updatedIds = [...state.cartKitIds, kitId];

          return {
            cartKitIds: updatedIds,
            cartCount: state.cartCount + 1, // ✅ derived, always correct
          };
        }),

      removeKit: (id: number) =>
        set(state => {
          const kitId = Number(id);
          const updatedIds = state.cartKitIds.filter(x => x !== kitId);

          return {
            cartKitIds: updatedIds,
            cartCount: state.cartCount - 1,
          };
        }),

      increment: () => set(state => ({ cartCount: state.cartCount + 1 })),

      decrement: () =>
        set(state => ({
          cartCount: Math.max(0, state.cartCount - 1),
        })),

      resetCart: () =>
        set({
          cartCount: 0,
          cartKitIds: [],
        }),
      resetNotificationCount: () =>
        set({
          notificationCount: 0,
        }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
