import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { ScreenNames } from '../../constants/AppConstants';

const PayPalWebViewScreen = ({ route, navigation }: any) => {
  const { markPaymentSuccess } = usePaymentStore();
  const { url } = route?.params;
  const paymentOrderDetails = route?.params?.paymentOrderDetails;
  const insets = useSafeAreaInsets();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (!paymentCompleted) {
          usePaymentStore.getState().showModal();
        }
      };
    }, [paymentCompleted]),
  );

  return (
    <WebView
      style={{ paddingTop: insets.top }}
      source={{ uri: url }}
      onNavigationStateChange={navState => {
        const currentUrl = navState.url;

        // 🔥 Detect success
        if (currentUrl.includes('paypal-success')) {
          const success = currentUrl.includes('success=true');

          if (success) {
            console.log('✅ PayPal Payment Success');
            flashMessageSucess(getTranslation('paymentsucesspaypal'));
            setPaymentCompleted(true);
            markPaymentSuccess();
            navigation.replace(ScreenNames.RATEANDREVIEWCONTAINER, {
              booking_id: paymentOrderDetails?.booking_id,
              nurse_id: paymentOrderDetails?.nurse_id,
              booking_number: paymentOrderDetails?.booking_number,
            });
          } else {
            flashMessageWarning('Payment failed');
            navigation.goBack();
          }
        }
      }}
    />
  );
};

export default PayPalWebViewScreen;
