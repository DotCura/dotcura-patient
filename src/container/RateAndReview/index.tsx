import React, { useState } from 'react';
import RateAndReviewComponent from '../../components/RateAndReview';
import { flashMessageWarning } from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';

const RateAndReviewContainer = ({ navigation, route }: any) => {
  const [rate, setRate] = useState<number | null>(null);
  const { activateNext, showModal, hideModal } = usePaymentStore();

  // =================== API ========================

  const _rateAndReview = async () => {
    if (rate === null) {
      flashMessageWarning(getTranslation('ratingvalidation'));
      return;
    }
    try {
      const fallbackOrderDetails = usePaymentStore.getState().orderDetails;
      const bookingId =
        route?.params?.booking_id ?? fallbackOrderDetails?.booking_id;
      const nurseId = route?.params?.nurse_id ?? fallbackOrderDetails?.nurse_id;
      const params = {
        nurse_id: nurseId,
        booking_id: bookingId,
        rate: rate,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          activateNext();
          const hasMorePendingPayments =
            usePaymentStore.getState().pendingQueue.length > 0;

          if (hasMorePendingPayments) {
            setTimeout(() => {
              showModal();
            }, 250);
          } else {
            hideModal();
          }
          navigation.goBack();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.RATEANDREVIEW,
        params,
        callback,
      });
    } catch (error) {
      console.log('ratenadreview error:', error);
    }
  };

  return (
    <RateAndReviewComponent
      rate={rate}
      handlePressRateAndReview={_rateAndReview}
      handleOnPressRate={(index: any) => {
        setRate(index);
      }}
    />
  );
};

export default RateAndReviewContainer;
