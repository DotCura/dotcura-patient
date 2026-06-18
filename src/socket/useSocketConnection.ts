import { useEffect, useRef } from 'react';
import { ZustandStores } from '../store';
import SocketService from './SocketService';
import { usePaymentStore } from '../store/PaymentStore/PaymentStore';
import { APIManager } from '../api/APIManager';
import { navigationRef } from '../constants/utils/navigationRef';
import { ApiEndPoints, isLive, MethodType } from '../api/APIConstant';

const SOCKET_URL = isLive
  ? 'https://cron-api.dotcura.com/booking'
  : 'https://staging-cron-api.dotcura.com/booking';

export const useSocketConnection = (patientId?: string | null) => {
  const { setOrderData, clearOrderData } = ZustandStores.OrderstatusStore();
  const hydrateQueue = usePaymentStore(s => s.hydrateQueue);

  console.log('SOCKET_URL', SOCKET_URL);

  // 🔥 Prevent multiple connections
  const isConnecting = useRef(false);
  const lastPatientId = useRef<string | null>(null);

  useEffect(() => {
    // 🔴 No patient → disconnect socket
    if (!patientId) {
      console.log('🔌 No patient ID - skipping socket connection');

      if (SocketService.isConnected()) {
        console.log('🔌 Disconnecting socket (no patient)');
        SocketService.disconnect();
      }

      clearOrderData();
      isConnecting.current = false;
      lastPatientId.current = null;
      return;
    }

    // 🟡 Same patient - skip reconnection
    if (lastPatientId.current === patientId && SocketService.isConnected()) {
      console.log('✅ Socket already connected for patient:', patientId);
      return;
    }

    // 🟡 Already connecting - skip
    if (isConnecting.current) {
      console.log('⏳ Socket connection in progress...');
      return;
    }

    // 🟢 Connect socket
    console.log('🔌 Connecting socket for patient:', patientId);
    isConnecting.current = true;
    lastPatientId.current = patientId;

    // Disconnect any existing connection first
    if (SocketService.isConnected()) {
      SocketService.disconnect();
    }

    SocketService.connect({
      url: SOCKET_URL,
      userId: patientId,
      role: 'P', // Patient
    });

    // ---- SOCKET EVENTS ----

    const handleBookingStatus = (data: any) => {
      console.log('📦 Booking Status Update:', data);

      const { booking_id, status, time, name } = data;

      setOrderData({
        booking_id,
        status,
        time,
        name,
      });
    };

    const handleNurseAssigned = (data: any) => {
      console.log('👨‍⚕️ Nurse Assigned:', data);
      // You can update order data here if needed
    };

    const handleOrderCancelled = (data: any) => {
      console.log('❌ Order Cancelled:', data);
      clearOrderData();
    };

    // const handleOrderComplete = (data: any) => {
    //   console.log('✅ Order completed:', data);

    //   const { booking_id } = data;

    //   // 🔒 Force payment modal
    //   setPendingPayment(booking_id);
    // };

    const refreshPayments = async () => {
      await APIManager.makeRequest({
        navigation: navigationRef,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.PAYMENT.GET_PENDING_PAYMENT_LIST,
        callback: (res: any) => {
          if (res.code === 1) {
            const unpaid = res.data
              .filter((b: any) => b.payment_status === 'unpaid')
              .map((b: any) => b.booking_id);

            hydrateQueue(unpaid);
          }
        },
      });
    };

    // Register event listeners
    SocketService.on('booking_status', handleBookingStatus);
    // SocketService.on('nurse_assigned', handleNurseAssigned);
    // SocketService.on('order_cancelled', handleOrderCancelled);
    SocketService.on('order_complete', refreshPayments);

    isConnecting.current = false;

    // 🧹 Cleanup on patient change / unmount
    return () => {
      console.log('🧹 Cleaning up socket listeners');

      SocketService.off('booking_status', handleBookingStatus);
      SocketService.off('order_complete', refreshPayments);

      // SocketService.off('nurse_assigned', handleNurseAssigned);
      // SocketService.off('order_cancelled', handleOrderCancelled);

      // Only disconnect if patient changed or component unmounted
      if (lastPatientId.current !== patientId) {
        SocketService.disconnect();
        isConnecting.current = false;
        lastPatientId.current = null;
      }
    };
  }, [patientId, setOrderData, clearOrderData]);

  return {
    isConnected: SocketService.isConnected(),
  };
};
