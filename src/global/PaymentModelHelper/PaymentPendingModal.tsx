import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { Colors } from '../../constants/Colors';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { paymentstyles } from './paymentstyles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { currency, flashMessageWarning } from '../../constants/GConstant';
import { fontsfamily } from '../../constants/FontFamily';
import CustomButton from '../Buttons';
import { images } from '../../constants/Images';
import { ScreenNames } from '../../constants/AppConstants';
import {
  getCurrentRouteName,
  navigationRef,
} from '../../constants/utils/navigationRef';
import { useNavigationStore } from '../../store/NavigationStore';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';

export const PaymentPendingModal = () => {
  const { status, orderDetails } = usePaymentStore();

  console.log('💳 PaymentPendingModal Render:', status, orderDetails);

  const currentRoute = useNavigationStore((s: any) => s.currentRoute);
  const isSplash = currentRoute === ScreenNames.CUSTOMSPLASHCONTAINER;
  if (isSplash) return null;

  const handleFinishOrder = async () => {
    if (!orderDetails?.booking_id) {
      flashMessageWarning('Booking not found');
      return;
    }

    try {
      const params = {
        booking_id: orderDetails.booking_id,
        amount: orderDetails?.summary?.total,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          console.log('insucess');
          const { customer, ephemeralKey, paymentIntent } = responseData.data;

          // 2️⃣ Initialize Stripe Payment Sheet
          await initializePaymentSheet(customer, ephemeralKey, paymentIntent);

          // 3️⃣ Open Stripe UI
          setTimeout(async () => {
            await openPaymentSheet();
          }, 500);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigationRef,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.CREATEPAYMENTINTENT,
        params,
        callback,
      });
    } catch (error) {
      console.log('create payment intent error:', error);
    }
  };

  // <##################### Stripe Start ###########################>

  const initializePaymentSheet = async (
    customer: any,
    ephemeralKey: any,
    paymentIntent: any,
  ) => {
    console.log('💳 initializePaymentSheet called');

    try {
      const { error } = await initPaymentSheet({
        // Required - client secret from your payment intent
        paymentIntentClientSecret: paymentIntent,

        // Optional - for saved payment methods
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,

        // UI Customization
        merchantDisplayName: 'Dotcura',
        style: 'automatic',

        // applePay: {
        //   merchantCountryCode: 'US',
        // },
        googlePay: {
          testEnv: true,
          merchantCountryCode: 'US',
          buttonType: 0,
        },

        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Demo User',
        },
      });

      if (error) {
        console.error('Error initializing payment sheet::::::::::', error);
      }
    } catch (error: any) {
      console.error('StripeError::::::::::', error);
    }
  };

  const openPaymentSheet = async () => {
    console.log('💳 openPaymentSheet called');

    const { error } = await presentPaymentSheet();

    if (error) {
      flashMessageWarning(error.message);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      console.log('sucess_payment');
      // Example (optimistic):
      // usePaymentStore.getState().markPaymentSuccess();
      // usePaymentStore.getState().resetPayment();

      //   navigationRef?.navigate(ScreenNames.RATEANDREVIEWCONTAINER);
    }
  };

  // <##################### Stripe End ###########################>

  return (
    <Modal
      isVisible={status === 'idle'}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => {}}
      onBackButtonPress={() => {}}
      swipeDirection={[]}
    >
      <View
        style={{
          backgroundColor: Colors.white,
          padding: 20,
          borderTopLeftRadius: 34,
          borderTopRightRadius: 34,
        }}
      >
        <View style={paymentstyles.vwHeadingLine} />
        <Text style={paymentstyles.lblOrderCompleteTitle}>
          {getTranslation('ordercompletetitlemodel')}
        </Text>
        <Text style={paymentstyles.lblOrderCompleteSubTitle}>
          {getTranslation('ordercompletesubtitlemodel')}
        </Text>

        <View style={paymentstyles.summaryContainer}>
          <View style={{ gap: getHeight(4) }}>
            <Text style={paymentstyles.summaryTitle}>
              {getTranslation('summarytitle')}
            </Text>
            <Text style={paymentstyles.summarySubtitle}>
              {getTranslation('summarysubtitle')}
            </Text>
          </View>
          <View style={paymentstyles.summaryInnerContainer}>
            {/* Subtotal list */}
            <View style={paymentstyles.summaryItemRow}>
              <Text style={paymentstyles.summaryLabel}>
                {getTranslation('subtotal')}
              </Text>
              <Text style={paymentstyles.summaryValue}>
                {currency} {orderDetails?.summary?.sub_total.toFixed(2)}
              </Text>
            </View>
            <ScrollView
              style={{ maxHeight: getHeight(180) }} // 🔥 controls scroll area height
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <View style={{ marginLeft: getWidth(12), gap: getHeight(8) }}>
                {orderDetails?.kits.map((kit: any) => (
                  <View
                    key={kit?.booking_kit_id}
                    style={paymentstyles.summaryItemRow}
                  >
                    <Text
                      style={[
                        paymentstyles.summaryLabel,
                        { marginRight: getWidth(10) },
                      ]}
                      numberOfLines={1}
                    >
                      {kit?.kit_name}
                    </Text>
                    <Text style={paymentstyles.summaryValue}>
                      {currency} {Number(kit?.price).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={paymentstyles.summaryItemRow}>
              <Text style={paymentstyles.summaryLabel}>
                {getTranslation('service')}
              </Text>
              <Text style={paymentstyles.summaryValue}>
                {/* {currency} {orderDetails?.homeServiceCharge.toFixed(2)} */}
              </Text>
            </View>

            {orderDetails?.summary?.discount_amount > 0 && (
              <View style={paymentstyles.summaryItemRow}>
                <Text style={[paymentstyles.summaryLabel]}>
                  {getTranslation('discount')}
                </Text>
                <Text
                  style={[
                    paymentstyles.summaryValue,
                    { color: Colors.green17 },
                  ]}
                >
                  -{currency}{' '}
                  {orderDetails?.summary?.discount_amount.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={[paymentstyles.summaryItemRow]}>
              <Text
                style={[
                  paymentstyles.summaryLabel,
                  { fontFamily: fontsfamily.gbold },
                ]}
              >
                {getTranslation('total')}
              </Text>
              <Text
                style={[
                  paymentstyles.summaryValue,
                  { fontFamily: fontsfamily.gbold },
                ]}
              >
                {currency} {orderDetails?.summary?.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={paymentstyles.btnPaymentHisory}>
          <CustomButton
            btnTitle={getTranslation('finishorder')}
            btnicon={false}
            btnPress={handleFinishOrder}
          />
          <CustomButton
            btnTitle={getTranslation('canclereservation')}
            style={{ backgroundColor: Colors.blueD1 }}
            btnicon={true}
            btnImage={images.imgcallpaymenthistory}
            textStyle={{ color: Colors.blue002 }}
            //  btnPress={props.funOpenCancleOrder}
          />
        </View>
        {/* <Text style={{ marginTop: 10, fontSize: 14 }}>
          {orderDetails?.kit_name} – ₹{orderDetails?.amount}
        </Text> */}

        {/* <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#0A3D91',
            padding: 14,
            borderRadius: 8,
          }}
          // onPress={() => { // // After Stripe success // markPaymentSuccess(); // resetPayment(); // }}
        >
          <Text
            style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}
          >
            Pay Now
          </Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};
