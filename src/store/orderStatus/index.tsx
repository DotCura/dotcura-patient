// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type ORDERSTATUS =
//   | 'order_sent'
//   | 'order_confirm'
//   | 'order_arrive'
//   | 'order_cancle'
//   | 'order_modified'
//   | '';

// interface Store {
//   orderStatus: ORDERSTATUS;
//   setOrderStatus: (data: ORDERSTATUS) => void;
// }

// const OrderstatusStore = create<Store>()(
//   persist(
//     set => ({
//       orderStatus: '',
//       setOrderStatus: (data: ORDERSTATUS) => set({ orderStatus: data }),
//     }),
//     {
//       name: 'orderStatusStore',
//       storage: createJSONStorage(() => AsyncStorage),
//     },
//   ),
// );

// export default OrderstatusStore;

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ORDERSTATUS =
  | 'Request'
  | 'Accept'
  | 'start_visit'
  | 'arrived'
  | 'Modified'
  | 'Rejected'
  | '';

interface OrderData {
  booking_id: string | null;
  status: ORDERSTATUS;
  time: string | null;
  name:string | null;
  nurseInfo?: any; // Add nurse details if needed
}

interface Store {
  orderStatus: ORDERSTATUS;
  orderData: OrderData | null;
  setOrderStatus: (data: ORDERSTATUS) => void;
  setOrderData: (data: OrderData) => void;
  clearOrderData: () => void;
}

const OrderstatusStore = create<Store>()(
  persist(
    (set) => ({
      orderStatus: '',
      orderData: null,
      
      setOrderStatus: (data: ORDERSTATUS) => set({ orderStatus: data }),
      
      setOrderData: (data: OrderData) => 
        set({ 
          orderData: data, 
          orderStatus: data.status 
        }),
      
      clearOrderData: () => 
        set({ 
          orderData: null, 
          orderStatus: '' 
        }),
    }),
    {
      name: 'orderStatusStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default OrderstatusStore;
