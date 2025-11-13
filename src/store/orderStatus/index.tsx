import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ORDERSTATUS =
  | 'order_sent'
  | 'order_confirm'
  | 'order_arrive'
  | 'order_cancle'
  | 'order_modified'
  | '';

interface Store {
  orderStatus: ORDERSTATUS;
  setOrderStatus: (data: ORDERSTATUS) => void;
}

const OrderstatusStore = create<Store>()(
  persist(
    set => ({
      orderStatus: '',
      setOrderStatus: (data: ORDERSTATUS) => set({ orderStatus: data }),
    }),
    {
      name: 'orderStatusStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default OrderstatusStore;
