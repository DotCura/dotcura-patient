

// import { useEffect } from 'react';
// import { ZustandStores } from '../store';
// import SocketService from './SocketService';

// const SOCKET_URL = 'http://3.108.139.142:6013/booking';

// export const useSocketConnection = (patientId?: string | null) => {
//   const { setOrderData, clearOrderData } =
//     ZustandStores.OrderstatusStore();

//   useEffect(() => {
//     // 🔴 No patient → disconnect socket
//     if (!patientId) {
//       if (SocketService.isConnected()) {
//         console.log('🔌 Disconnecting socket (no patient)');
//         SocketService.disconnect();
//       }
//       clearOrderData();
//       return;
//     }

//     // 🟢 Patient available → connect socket
//     console.log('🔌 Connecting socket for patient:', patientId);

//     SocketService.connect({
//       url: SOCKET_URL,
//       userId: patientId,
//       role: 'P', // Patient
//     });

//     // ---- SOCKET EVENTS ----

//     const handleBookingStatus = (data: any) => {
//       console.log('📦 Booking Status Update:', data);

//       const { booking_id, status, time,name } = data;

//       setOrderData({
//         booking_id,
//         status,
//         time,
//         name
//       });
//     };

//     SocketService.on('booking_status', handleBookingStatus);

//     SocketService.on('nurse_assigned', (data:any) => {
//       console.log('👨‍⚕️ Nurse Assigned:', data);
//     });

//     SocketService.on('order_cancelled', (data:any) => {
//       console.log('❌ Order Cancelled:', data);
//       clearOrderData();
//     });

//     // 🧹 Cleanup on patient change / unmount
//     return () => {
//       SocketService.off('booking_status', handleBookingStatus);
//       SocketService.off('nurse_assigned');
//       SocketService.off('order_cancelled');
//       SocketService.disconnect();
//     };
//   }, [patientId, setOrderData, clearOrderData]);

//   return {
//     isConnected: SocketService.isConnected(),
//   };
// };

import { useEffect, useRef } from 'react';
import { ZustandStores } from '../store';
import SocketService from './SocketService';
import { usePaymentStore } from '../store/PaymentStore/PaymentStore';


const SOCKET_URL = 'http://3.108.139.142:6013/booking';

export const useSocketConnection = (patientId?: string | null) => {
  const { setOrderData, clearOrderData } = ZustandStores.OrderstatusStore();
  const { setPendingPayment } = usePaymentStore();

  
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

    const handleOrderComplete = (data: any) => {
      console.log('✅ Order completed:', data);
    
      const { booking_id } = data;
    
      // 🔒 Force payment modal
      setPendingPayment(booking_id);
    };
    

    // Register event listeners
    SocketService.on('booking_status', handleBookingStatus);
    // SocketService.on('nurse_assigned', handleNurseAssigned);
    // SocketService.on('order_cancelled', handleOrderCancelled);
    SocketService.on('order_complete', handleOrderComplete);

    isConnecting.current = false;

    // 🧹 Cleanup on patient change / unmount
    return () => {
      console.log('🧹 Cleaning up socket listeners');
      
      SocketService.off('booking_status', handleBookingStatus);
      SocketService.off('order_complete', handleOrderComplete);

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