import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PaymentState {
  bookingId: string | null;
  status: 'idle' | 'pending' | 'success';
  orderDetails: any | null;

  setPendingPayment: (bookingId: string) => void;
  setOrderDetails: (data: any) => void;
  markPaymentSuccess: () => void;
  resetPayment: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    set => ({
      bookingId: null,
      status: 'idle',
      orderDetails: null,

      setPendingPayment: bookingId =>
        set({
          bookingId,
          status: 'pending',
        }),

      setOrderDetails: data =>
        set({
          orderDetails: data,
        }),

      markPaymentSuccess: () =>
        set({
          status: 'success',
        }),

      resetPayment: () =>
        set({
          bookingId: null,
          status: 'idle',
          orderDetails: null,
        }),
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
      name: 'payment-store',
    },
  ),
);
