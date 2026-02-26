// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// interface PaymentState {
//   bookingId: string | null;
//   status: 'idle' | 'pending' | 'success';
//   orderDetails: any | null;

//   setPendingPayment: (bookingId: string) => void;
//   setOrderDetails: (data: any) => void;
//   markPaymentSuccess: () => void;
//   resetPayment: () => void;
// }

// export const usePaymentStore = create<PaymentState>()(
//   persist(
//     set => ({
//       bookingId: null,
//       status: 'idle',
//       orderDetails: null,

//       setPendingPayment: bookingId =>
//         set({
//           bookingId,
//           status: 'pending',
//         }),

//       setOrderDetails: data =>
//         set({
//           orderDetails: data,
//         }),

//       markPaymentSuccess: () =>
//         set({
//           status: 'success',
//         }),

//       resetPayment: () =>
//         set({
//           bookingId: null,
//           status: 'idle',
//           orderDetails: null,
//         }),
//     }),
//     {
//       storage: createJSONStorage(() => AsyncStorage),
//       name: 'payment-store',
//     },
//   ),
// );

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PaymentState {
  pendingQueue: number[];
  activeBookingId: number | null;
  status: 'idle' | 'pending' | 'success';
  orderDetails: any | null;

  hydrateQueue: (ids: number[]) => void;
  setOrderDetails: (data: any) => void;
  markPaymentSuccess: () => void;
  activateNext: () => void;
  resetAll: () => void;
  showModal: () => void;
  hideModal: () => void;
  isModalVisible: boolean;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      pendingQueue: [],
      activeBookingId: null,
      status: 'idle',
      orderDetails: null,
      isModalVisible: true,

      // hydrateQueue: (ids) =>
      //   set({
      //     pendingQueue: ids,
      //     activeBookingId: ids[0] ?? null,
      //     status: ids.length ? 'pending' : 'idle',
      //     orderDetails: null,
      //   }),
      hydrateQueue: ids =>
        set(state => {
          const nextBookingId = ids[0] ?? null;
          const isSameBooking = state.activeBookingId === nextBookingId;

          return {
            pendingQueue: ids,
            activeBookingId: nextBookingId,
            status: ids.length ? 'pending' : 'idle',

            // 🔥 DO NOT clear details if same booking
            orderDetails: isSameBooking ? state.orderDetails : null,
          };
        }),

      setOrderDetails: data =>
        set({
          orderDetails: data,
        }),

      markPaymentSuccess: () =>
        set({
          status: 'success',
        }),

      activateNext: () => {
        const [, ...rest] = get().pendingQueue;
        set({
          pendingQueue: rest,
          activeBookingId: rest[0] ?? null,
          status: rest.length ? 'pending' : 'idle',
          orderDetails: null,
        });
      },
      showModal: () =>
        set({
          isModalVisible: true,
        }),
      
      hideModal: () =>
        set({
          isModalVisible: false,
        }),

      resetAll: () =>
        set({
          pendingQueue: [],
          activeBookingId: null,
          status: 'idle',
          orderDetails: null,
        }),
    }),
    {
      name: 'payment-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
