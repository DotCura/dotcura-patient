import { useEffect, useRef } from 'react';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
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

  const patientId = ZustandStores.UserStore(s => s.patientId);

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
      showLoader: false,
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
      showLoader: false,
      params: { booking_id: activeBookingId },
      // params: { booking_id: 432 },
      callback: (res: any) => {
        if (res.code === StatusCode.SUCCESS) {
          console.log('payment details', res.data);

          setOrderDetails(res.data);
        } else {
          console.log('failed to fetch payment details');
        }
      },
    });
  }, [activeBookingId, status]);
};
