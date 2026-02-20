// not proper this only work one booking not multiple

// import { useEffect } from 'react';
// import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
// import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
// import { flashMessageWarning } from '../../constants/GConstant';
// import { APIManager } from '../../api/APIManager';

// export const usePaymentInitializer = (navigation: any) => {
//   const {
//     bookingId,
//     status,
//     orderDetails,
//     setOrderDetails,
//   } = usePaymentStore();

//   const _getPaymentHistory = async () => {
//     try {
//       const params = {
//         booking_id: 221,
//       };

//       const callback = async (responseData: any) => {
//         if (responseData.code === StatusCode.SUCCESS) {
//           // 🔥 SET ORDER DETAILS HERE
//           setOrderDetails(responseData.data);
//         } else {
//           flashMessageWarning(responseData.message);
//         }
//       };

//       await APIManager.makeRequest({
//         navigation,
//         method: MethodType.POST,
//         apiEndPoint: ApiEndPoints.PAYMENT.GETPAYMENTDETAILS,
//         callback,
//         params,
//       });
//     } catch (error) {
//       console.log('❌ getPaymentDetails error:', error);
//     }
//   };

//   useEffect(() => {
//     console.log(
//       '💳 Payment Init:',
//       bookingId,
//       status,
//       orderDetails
//     );

//     // if (
//     //   status === 'pending' &&
//     //   bookingId &&
//     //   !orderDetails
//     // ) {
//       console.log('📡 Fetching payment/order details');
//       _getPaymentHistory();
//     // }
//   }, [status, bookingId]);
// };

//app restart at that time only call this is valid login not call
// import { useEffect } from 'react';
// import { APIManager } from '../../api/APIManager';
// import {
//   ApiEndPoints,
//   MethodType,
//   StatusCode,
// } from '../../api/APIConstant';
// import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';

// export const usePaymentInitializer = (navigation: any) => {
//   const {
//     activeBookingId,
//     status,
//     orderDetails,
//     hydrateQueue,
//     setOrderDetails,
//   } = usePaymentStore();

//   // 🔥 ALWAYS SYNC PENDING PAYMENTS ON APP OPEN
//   const syncPendingPayments = async () => {
//     await APIManager.makeRequest({
//       navigation,
//       method: MethodType.GET,
//       apiEndPoint: ApiEndPoints.PAYMENT.GET_PENDING_PAYMENT_LIST,
//       callback: (res: any) => {
//         if (res.code === 1 && Array.isArray(res.data)) {
//           const unpaid = res.data
//             .filter((b: any) => b.payment_status === 'unpaid')
//             .map((b: any) => b.booking_id);

//           hydrateQueue(unpaid);
//         }
//       },
//     });
//   };

//   // 🔁 Load payment list on app start
//   useEffect(() => {
//     syncPendingPayments();
//   }, []);

//   // 🔁 Load order details for ACTIVE booking
//   useEffect(() => {
//     if (!activeBookingId || status !== 'pending' || orderDetails) return;

//     APIManager.makeRequest({
//       navigation,
//       method: MethodType.POST,
//       apiEndPoint: ApiEndPoints.PAYMENT.GETPAYMENTDETAILS,
//       params: { booking_id: activeBookingId },
//       callback: (res: any) => {
//         if (res.code === StatusCode.SUCCESS) {
//           setOrderDetails(res.data);
//         }
//       },
//     });
//   }, [activeBookingId, status]);
// };


//tetsing 

import { useEffect, useRef } from 'react';
import { APIManager } from '../../api/APIManager';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
} from '../../api/APIConstant';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { ZustandStores } from '../../store';

export const usePaymentInitializer = (navigation: any) => {
  const {
    activeBookingId,
    status,
    orderDetails,
    hydrateQueue,
    setOrderDetails,
  } = usePaymentStore();

  const patientId = ZustandStores.UserStore((s) => s.patientId);

  // 🔒 prevent duplicate API calls
  const hasSyncedRef = useRef(false);

  // 🔥 SYNC WHEN USER LOGS IN
  useEffect(() => {
    if (!patientId) {
      // logout case → allow sync next time
      hasSyncedRef.current = false;
      return;
    }

    if (hasSyncedRef.current) return;

    hasSyncedRef.current = true;

    APIManager.makeRequest({
      navigation,
      method: MethodType.GET,
      apiEndPoint: ApiEndPoints.PAYMENT.GET_PENDING_PAYMENT_LIST,
      showLoader:false,
      callback: (res: any) => {
        if (res.code === 1 && Array.isArray(res.data)) {
          const unpaid = res.data
            .filter((b: any) => b.payment_status === 'unpaid')
            .map((b: any) => b.booking_id);

          hydrateQueue(unpaid);
        }
      },
    });
  }, [patientId]);

  // 🔁 Load order details for active booking
  useEffect(() => {
    if (!activeBookingId || status !== 'pending' || orderDetails) return;

    APIManager.makeRequest({
      navigation,
      method: MethodType.POST,
      apiEndPoint: ApiEndPoints.PAYMENT.GETPAYMENTDETAILS,
      showLoader:false,
      // params: { booking_id: activeBookingId },
      params: { booking_id: 270 },
      callback: (res: any) => {
        if (res.code === StatusCode.SUCCESS) {
          setOrderDetails(res.data);
        }
      },
    });
  }, [activeBookingId, status]);
};
