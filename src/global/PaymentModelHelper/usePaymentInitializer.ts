import { useEffect } from 'react';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { flashMessageWarning } from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';

export const usePaymentInitializer = (navigation: any) => {
  const {
    bookingId,
    status,
    orderDetails,
    setOrderDetails,
  } = usePaymentStore();

  const _getPaymentHistory = async () => {
    try {
      const params = {
        booking_id: 221,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          // 🔥 SET ORDER DETAILS HERE
          setOrderDetails(responseData.data);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.GETPAYMENTDETAILS,
        callback,
        params,
      });
    } catch (error) {
      console.log('❌ getPaymentDetails error:', error);
    }
  };

  useEffect(() => {
    console.log(
      '💳 Payment Init:',
      bookingId,
      status,
      orderDetails
    );

    // if (
    //   status === 'pending' &&
    //   bookingId &&
    //   !orderDetails
    // ) {
      console.log('📡 Fetching payment/order details');
      _getPaymentHistory();
    // }
  }, [status, bookingId]);
};
