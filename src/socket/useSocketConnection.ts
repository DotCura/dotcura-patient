// import { useEffect, useRef } from 'react';
// import { ZustandStores } from '../store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SocketService from './SocketService';

// const SOCKET_URL = 'http://3.108.139.142:6013/booking';

// export const useSocketConnection = (patientId?: string) => {
//   const { setOrderData } = ZustandStores.OrderstatusStore();
//   const isInitialized = useRef(false);

//   useEffect(() => {
//     if (!patientId || isInitialized.current) return;

//     // Connect to socket with your specific configuration
//     SocketService.connect({
//       url: SOCKET_URL,
//       userId: patientId,
//       role: 'P', // P for Patient
//     });

//     isInitialized.current = true;

//     // Listen for booking status updates
//     const handleBookingStatus = (data: any) => {
//       console.log('📦 Booking Status Update:', data);
      
//       const { booking_id, status, time } = data;
      
//       // Update Zustand store with new status
//       setOrderData({
//         booking_id,
//         status,
//         time,
//       });
//     };

//     SocketService.on('booking_status', handleBookingStatus);

//     // Optional: Listen for other events
//     SocketService.on('nurse_assigned', (data: any) => {
//       console.log('👨‍⚕️ Nurse Assigned:', data);
//       // Handle nurse assignment
//     });

//     SocketService.on('order_cancelled', (data: any) => {
//       console.log('❌ Order Cancelled:', data);
//       // Handle order cancellation
//     });

//     // Cleanup on unmount
//     return () => {
//       SocketService.off('booking_status', handleBookingStatus);
//       SocketService.off('nurse_assigned');
//       SocketService.off('order_cancelled');
      
//       // Optional: Disconnect socket when component unmounts
//       // SocketService.disconnect();
//     };
//   }, [patientId, setOrderData]);

//   return {
//     isConnected: SocketService.isConnected(),
//     emit: SocketService.emit.bind(SocketService),
//     disconnect: SocketService.disconnect.bind(SocketService),
//     reconnect: SocketService.reconnect.bind(SocketService),
//   };
// };

import { useEffect } from 'react';
import { ZustandStores } from '../store';
import SocketService from './SocketService';

const SOCKET_URL = 'http://3.108.139.142:6013/booking';

export const useSocketConnection = (patientId?: string | null) => {
  const { setOrderData, clearOrderData } =
    ZustandStores.OrderstatusStore();

  useEffect(() => {
    // 🔴 No patient → disconnect socket
    if (!patientId) {
      if (SocketService.isConnected()) {
        console.log('🔌 Disconnecting socket (no patient)');
        SocketService.disconnect();
      }
      clearOrderData();
      return;
    }

    // 🟢 Patient available → connect socket
    console.log('🔌 Connecting socket for patient:', patientId);

    SocketService.connect({
      url: SOCKET_URL,
      userId: patientId,
      role: 'P', // Patient
    });

    // ---- SOCKET EVENTS ----

    const handleBookingStatus = (data: any) => {
      console.log('📦 Booking Status Update:', data);

      const { booking_id, status, time,name } = data;

      setOrderData({
        booking_id,
        status,
        time,
        name
      });
    };

    SocketService.on('booking_status', handleBookingStatus);

    SocketService.on('nurse_assigned', (data:any) => {
      console.log('👨‍⚕️ Nurse Assigned:', data);
    });

    SocketService.on('order_cancelled', (data:any) => {
      console.log('❌ Order Cancelled:', data);
      clearOrderData();
    });

    // 🧹 Cleanup on patient change / unmount
    return () => {
      SocketService.off('booking_status', handleBookingStatus);
      SocketService.off('nurse_assigned');
      SocketService.off('order_cancelled');
      SocketService.disconnect();
    };
  }, [patientId, setOrderData, clearOrderData]);

  return {
    isConnected: SocketService.isConnected(),
  };
};
