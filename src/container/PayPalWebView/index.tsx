import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { flashMessageSucess, flashMessageWarning } from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getTranslation } from '../../localization/i18n/i18n.config';

const PayPalWebViewScreen = ({ route, navigation }: any) => {
  const { markPaymentSuccess, activateNext } = usePaymentStore();
  const { url } = route?.params;
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
            activateNext();
            navigation.goBack();
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
