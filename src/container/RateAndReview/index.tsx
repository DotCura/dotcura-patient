import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import RateAndReviewComponent from '../../components/RateAndReview';
import { flashMessageWarning } from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';

const RateAndReviewContainer = ({ navigation }: any) => {
  const [rate, setRate] = useState<number | null>(null);

  // =================== API ========================

  const _rateAndReview = async () => {
    if (rate === null) {
      flashMessageWarning(getTranslation('ratingvalidation'));
      return;
    }
    try {
      const params = {
        // nurse_id:,
        // booking_id:,
        // rate:,
      };

      // console.log('params', params);

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
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
      handleOnPressRate={(index: any) => {
        setRate(index);
      }}
    />
  );
};

export default RateAndReviewContainer;
