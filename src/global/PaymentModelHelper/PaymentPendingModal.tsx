// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import Modal from 'react-native-modal';
// import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
// import { Colors } from '../../constants/Colors';
// import { getTranslation } from '../../localization/i18n/i18n.config';
// import { paymentstyles } from './paymentstyles';
// import { getHeight, getWidth } from '../../constants/utils/Dimensions';
// import { currency, flashMessageWarning } from '../../constants/GConstant';
// import { fontsfamily } from '../../constants/FontFamily';
// import CustomButton from '../Buttons';
// import { images } from '../../constants/Images';
// import { ScreenNames } from '../../constants/AppConstants';
// import {
//   getCurrentRouteName,
//   navigationRef,
// } from '../../constants/utils/navigationRef';
// import { useNavigationStore } from '../../store/NavigationStore';
// import {
//   initPaymentSheet,
//   presentPaymentSheet,
// } from '@stripe/stripe-react-native';
// import { APIManager } from '../../api/APIManager';
// import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';

// export const PaymentPendingModal = () => {
//   const { status, orderDetails, markPaymentSuccess, activateNext } =
//     usePaymentStore();

//   console.log('💳 PaymentPendingModal Render:', status, orderDetails);

//   const currentRoute = useNavigationStore((s: any) => s.currentRoute);
//   const isSplash = currentRoute === ScreenNames.CUSTOMSPLASHCONTAINER;
//   if (isSplash) return null;

//   if (status !== 'pending' || !orderDetails) return null;

//   const handleFinishOrder = async () => {
//     if (!orderDetails?.booking_id) {
//       flashMessageWarning('Booking not found');
//       return;
//     }

//     try {
//       const params = {
//         booking_id: orderDetails.booking_id,
//         amount: orderDetails?.summary?.total,
//       };

//       const callback = async (responseData: any) => {
//         if (responseData.code === StatusCode.SUCCESS) {
//           console.log('insucess');
//           const { customer, ephemeralKey, paymentIntent } = responseData.data;

//           // 2️⃣ Initialize Stripe Payment Sheet
//           await initializePaymentSheet(customer, ephemeralKey, paymentIntent);

//           // 3️⃣ Open Stripe UI
//           setTimeout(async () => {
//             await openPaymentSheet();
//           }, 500);
//         } else {
//           flashMessageWarning(responseData.message);
//         }
//       };

//       await APIManager.makeRequest({
//         navigationRef,
//         method: MethodType.POST,
//         apiEndPoint: ApiEndPoints.PAYMENT.CREATEPAYMENTINTENT,
//         params,
//         callback,
//       });
//     } catch (error) {
//       console.log('create payment intent error:', error);
//     }
//   };

//   // <##################### Stripe Start ###########################>

//   const initializePaymentSheet = async (
//     customer: any,
//     ephemeralKey: any,
//     paymentIntent: any,
//   ) => {
//     console.log('💳 initializePaymentSheet called');

//     try {
//       const { error } = await initPaymentSheet({
//         // Required - client secret from your payment intent
//         paymentIntentClientSecret: paymentIntent,

//         // Optional - for saved payment methods
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,

//         // UI Customization
//         merchantDisplayName: 'Dotcura',
//         style: 'automatic',

//         // applePay: {
//         //   merchantCountryCode: 'US',
//         // },
//         googlePay: {
//           testEnv: true,
//           merchantCountryCode: 'US',
//           buttonType: 0,
//         },

//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: 'Demo User',
//         },
//       });

//       if (error) {
//         console.error('Error initializing payment sheet::::::::::', error);
//       }
//     } catch (error: any) {
//       console.error('StripeError::::::::::', error);
//     }
//   };

//   const openPaymentSheet = async () => {
//     console.log('💳 openPaymentSheet called');

//     const { error } = await presentPaymentSheet();

//     if (error) {
//       flashMessageWarning(error.message);
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       console.log('sucess_payment');

//       markPaymentSuccess();
//       // navigationRef?.navigate(ScreenNames.RATEANDREVIEWCONTAINER);
//       activateNext(); // 🔥 MOVE TO NEXT UNPAID

//       // Example (optimistic):
//       // usePaymentStore.getState().markPaymentSuccess();
//       // usePaymentStore.getState().resetPayment();
//     }
//   };

//   // <##################### Stripe End ###########################>

//   return (
//     <Modal
//       isVisible
//       animationIn="slideInUp"
//       animationOut="slideOutDown"
//       backdropOpacity={0.6}
//       useNativeDriver
//       hideModalContentWhileAnimating
//       style={{ justifyContent: 'flex-end', margin: 0 }}
//       onBackdropPress={() => {}}
//       onBackButtonPress={() => {}}
//       swipeDirection={[]}
//     >
//       <View
//         style={{
//           backgroundColor: Colors.white,
//           padding: 20,
//           borderTopLeftRadius: 34,
//           borderTopRightRadius: 34,
//         }}
//       >
//         <View style={paymentstyles.vwHeadingLine} />
//         <Text style={paymentstyles.lblOrderCompleteTitle}>
//           {getTranslation('ordercompletetitlemodel')}
//         </Text>
//         <Text style={paymentstyles.lblOrderCompleteSubTitle}>
//           {getTranslation('ordercompletesubtitlemodel')}
//         </Text>

//         <View style={paymentstyles.summaryContainer}>
//           <View style={{ gap: getHeight(4) }}>
//             <Text style={paymentstyles.summaryTitle}>
//               {getTranslation('summarytitle')}
//             </Text>
//             <Text style={paymentstyles.summarySubtitle}>
//               {getTranslation('summarysubtitle')}
//             </Text>
//           </View>
//           <View style={paymentstyles.summaryInnerContainer}>
//             {/* Subtotal list */}
//             <View style={paymentstyles.summaryItemRow}>
//               <Text style={paymentstyles.summaryLabel}>
//                 {getTranslation('subtotal')}
//               </Text>
//               <Text style={paymentstyles.summaryValue}>
//                 {currency} {orderDetails?.summary?.sub_total.toFixed(2)}
//               </Text>
//             </View>
//             <ScrollView
//               style={{ maxHeight: getHeight(180) }} // 🔥 controls scroll area height
//               showsVerticalScrollIndicator={false}
//               nestedScrollEnabled
//             >
//               <View style={{ marginLeft: getWidth(12), gap: getHeight(8) }}>
//                 {orderDetails?.kits.map((kit: any) => (
//                   <View
//                     key={kit?.booking_kit_id}
//                     style={paymentstyles.summaryItemRow}
//                   >
//                     <Text
//                       style={[
//                         paymentstyles.summaryLabel,
//                         { marginRight: getWidth(10) },
//                       ]}
//                       numberOfLines={1}
//                     >
//                       {kit?.kit_name}
//                     </Text>
//                     <Text style={paymentstyles.summaryValue}>
//                       {currency} {Number(kit?.price).toFixed(2)}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             </ScrollView>
//             <View style={paymentstyles.summaryItemRow}>
//               <Text style={paymentstyles.summaryLabel}>
//                 {getTranslation('service')}
//               </Text>
//               <Text style={paymentstyles.summaryValue}>
//                 {currency} {orderDetails?.homeServiceCharge}
//               </Text>
//             </View>

//             {orderDetails?.summary?.discount_amount > 0 && (
//               <View style={paymentstyles.summaryItemRow}>
//                 <Text style={[paymentstyles.summaryLabel]}>
//                   {getTranslation('discount')}
//                 </Text>
//                 <Text
//                   style={[
//                     paymentstyles.summaryValue,
//                     { color: Colors.green17 },
//                   ]}
//                 >
//                   -{currency}{' '}
//                   {orderDetails?.summary?.discount_amount.toFixed(2)}
//                 </Text>
//               </View>
//             )}

//             <View style={[paymentstyles.summaryItemRow]}>
//               <Text
//                 style={[
//                   paymentstyles.summaryLabel,
//                   { fontFamily: fontsfamily.gbold },
//                 ]}
//               >
//                 {getTranslation('total')}
//               </Text>
//               <Text
//                 style={[
//                   paymentstyles.summaryValue,
//                   { fontFamily: fontsfamily.gbold },
//                 ]}
//               >
//                 {currency} {orderDetails?.summary?.total.toFixed(2)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={paymentstyles.btnPaymentHisory}>
//           <CustomButton
//             btnTitle={getTranslation('finishorder')}
//             btnicon={false}
//             btnPress={handleFinishOrder}
//           />
//           <CustomButton
//             btnTitle={getTranslation('contactuspaymentmodel')}
//             style={{ backgroundColor: Colors.blueD1 }}
//             btnicon={true}
//             btnImage={images.imgcallpaymenthistory}
//             textStyle={{ color: Colors.blue002 }}
//             //  btnPress={props.funOpenCancleOrder}
//           />
//         </View>
//         {/* <Text style={{ marginTop: 10, fontSize: 14 }}>
//           {orderDetails?.kit_name} – ₹{orderDetails?.amount}
//         </Text> */}

//         {/* <TouchableOpacity
//           style={{
//             marginTop: 20,
//             backgroundColor: '#0A3D91',
//             padding: 14,
//             borderRadius: 8,
//           }}
//           // onPress={() => { // // After Stripe success // markPaymentSuccess(); // resetPayment(); // }}
//         >
//           <Text
//             style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}
//           >
//             Pay Now
//           </Text>
//         </TouchableOpacity> */}
//       </View>
//     </Modal>
//   );
// };

//with apple pay above is payment sheet code

import React, { useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { Colors } from '../../constants/Colors';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { paymentstyles } from './paymentstyles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import {
  currency,
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import { fontsfamily } from '../../constants/FontFamily';
import CustomButton from '../Buttons';
import { images } from '../../constants/Images';
import { ScreenNames } from '../../constants/AppConstants';
import { navigationRef } from '../../constants/utils/navigationRef';
import { useNavigationStore } from '../../store/NavigationStore';
import {
  useStripe,
  PlatformPay,
  confirmPayment,
} from '@stripe/stripe-react-native';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';

export const PaymentPendingModal = () => {
  const {
    status,
    orderDetails,
    markPaymentSuccess,
    hideModal,
    isModalVisible,
  } = usePaymentStore();

  const { confirmPlatformPayPayment, isPlatformPaySupported } = useStripe();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  console.log('💳 PaymentPendingModal Render:', status, orderDetails);

  const currentRoute = useNavigationStore((s: any) => s.currentRoute);
  const isSplash = currentRoute === ScreenNames.CUSTOMSPLASHCONTAINER;
  if (isSplash) return null;
  console.log('orderDetails', orderDetails);
  console.log('isModalVisible', isModalVisible);
  console.log('status', status);

  if (status !== 'pending' || !orderDetails || !isModalVisible) return null;

  const navigateToRateAndReview = (paymentOrderDetails: any) => {
    hideModal();
    navigationRef.navigate(ScreenNames.RATEANDREVIEWCONTAINER, {
      booking_id: paymentOrderDetails?.booking_id,
      nurse_id: paymentOrderDetails?.nurse_id,
      booking_number: paymentOrderDetails?.booking_number,
    });
  };

  // const handleFinishOrder = async () => {
  //   if (!orderDetails?.booking_id) {
  //     flashMessageWarning('Booking not found');
  //     return;
  //   }

  //   const isSupported = await isPlatformPaySupported();

  //   if (!isSupported) {
  //     flashMessageWarning('Apple Pay not supported on this device');
  //     return;
  //   }

  //   try {
  //     const params = {
  //       booking_id: orderDetails.booking_id,
  //       amount: orderDetails?.summary?.total,
  //     };

  //     const callback = async (responseData: any) => {
  //       if (responseData.code === StatusCode.SUCCESS) {
  //         const { paymentIntent } = responseData.data;
  //         const isIOS = Platform.OS === 'ios';

  //         const { error } = await confirmPlatformPayPayment(
  //           paymentIntent,
  //           isIOS
  //             ? {
  //                 applePay: {
  //                   merchantCountryCode: 'IT',
  //                   currencyCode: 'EUR',
  //                   cartItems: [
  //                     {
  //                       label: 'Dotcura Service',
  //                       amount: orderDetails.summary.total.toFixed(2),
  //                       paymentType: PlatformPay.PaymentType.Immediate,
  //                     },
  //                   ],
  //                 },
  //               }
  //             : {
  //                 googlePay: {
  //                   testEnv: true,
  //                   merchantName: 'Dotcura',
  //                   merchantCountryCode: 'IT',
  //                   currencyCode: 'EUR',
  //                 },
  //               },
  //         );

  //         if (error) {
  //           console.log('Apple Pay error:', error);
  //           flashMessageWarning(error.message);
  //         } else {
  //           console.log('✅ Apple Pay Success');
  //           markPaymentSuccess();
  //           activateNext();
  //         }
  //       } else {
  //         flashMessageWarning(responseData.message);
  //       }
  //     };

  //     await APIManager.makeRequest({
  //       navigationRef,
  //       method: MethodType.POST,
  //       apiEndPoint: ApiEndPoints.PAYMENT.CREATEPAYMENTINTENT,
  //       params,
  //       callback,
  //     });
  //   } catch (err) {
  //     console.log('Apple Pay error:', err);
  //   }
  // };

  const handleApplePay = async () => {
    const isSupported = await isPlatformPaySupported();

    if (!isSupported) {
      flashMessageWarning('Apple Pay not supported on this device');
      setIsPaymentLoading(false);
      return;
    }

    try {
      const params = {
        booking_id: orderDetails.booking_id,
        amount: orderDetails?.summary?.total,
      };

      const callback = async (responseData: any) => {
        setIsPaymentLoading(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const { paymentIntent } = responseData.data;
          const isIOS = Platform.OS === 'ios';

          const { error } = await confirmPlatformPayPayment(
            paymentIntent,
            isIOS
              ? {
                  applePay: {
                    merchantCountryCode: 'IT',
                    currencyCode: 'EUR',
                    cartItems: [
                      {
                        label: 'Dotcura Service',
                        amount: orderDetails.summary.total.toFixed(2),
                        paymentType: PlatformPay.PaymentType.Immediate,
                      },
                    ],
                  },
                }
              : {
                  googlePay: {
                    testEnv: true,
                    merchantName: 'Dotcura',
                    merchantCountryCode: 'IT',
                    currencyCode: 'EUR',
                  },
                },
          );

          if (error) {
            console.log('Apple Pay error:', error);
            flashMessageWarning(
              'Apple Pay error:' + JSON.stringify(error, null, 2),
            );
          } else {
            console.log('✅ Apple Pay Success');
            flashMessageSucess(getTranslation('paymentsucessapplepay'));
            markPaymentSuccess();
            navigateToRateAndReview(orderDetails);
          }
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
        showLoader: false,
      });
    } catch (err) {
      setIsPaymentLoading(false);
      console.log('Apple Pay error:', err);
    }
  };

  const handlePayPal = async () => {
    try {
      const params = {
        booking_id: orderDetails?.booking_id,
      };

      const callback = async (responseData: any) => {
        setIsPaymentLoading(false);
        if (responseData.code !== StatusCode.SUCCESS) {
          flashMessageWarning(responseData.message);
          return;
        }

        const { checkoutUrl } = responseData.data;
        hideModal();

        navigationRef.navigate(ScreenNames.PAYPALWEBVIEWSCREEN, {
          url: checkoutUrl,
          paymentOrderDetails: {
            booking_id: orderDetails?.booking_id,
            nurse_id: orderDetails?.nurse_id,
            booking_number: orderDetails?.booking_number,
          },
        });
      };

      await APIManager.makeRequest({
        navigationRef,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.PAYPALCHECKOUTSESSION,
        params,
        callback,
        showLoader: false,
      });
    } catch (err) {
      setIsPaymentLoading(false);
      console.log('PayPal error:', err);
    }
  };

  const handleKlarna = async () => {
    try {
      const params = {
        booking_id: orderDetails?.booking_id,
      };

      const callback = async (responseData: any) => {
        setIsPaymentLoading(false);
        if (responseData.code !== StatusCode.SUCCESS) {
          flashMessageWarning(responseData.message);
          return;
        }

        const { client_secret } = responseData.data;

        const { error, paymentIntent } = await confirmPayment(client_secret, {
          paymentMethodType: 'Klarna',
          paymentMethodData: {
            billingDetails: {
              name: 'Demo User',
              email: 'demo@email.com',
            },
          },
        });

        if (error) {
          console.log('❌ Klarna Error:', error);
          flashMessageWarning(error.message);
        } else {
          console.log('✅ Klarna Success:', paymentIntent?.status);
          flashMessageSucess(getTranslation('paymentsucesskarla'));

          if (paymentIntent && paymentIntent.status === 'Succeeded') {
            markPaymentSuccess();
            navigateToRateAndReview(orderDetails);
          }
        }
      };

      await APIManager.makeRequest({
        navigationRef,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.KLARNACHECKOUTSESSION,
        params,
        callback,
        showLoader: false,
      });
    } catch (err) {
      setIsPaymentLoading(false);
      console.log('Klarna error:', err);
    }
  };

  const handleFinishOrder = async () => {
    if (!orderDetails?.booking_id) {
      flashMessageWarning('Booking not found');
      return;
    }

    const paymentMethod = orderDetails?.default_payment_method;

    if (paymentMethod === '1') {
      setIsPaymentLoading(true);
      await handleApplePay();
      return;
    }

    if (paymentMethod === '2') {
      setIsPaymentLoading(true);
      await handleKlarna();
      return;
    }

    if (paymentMethod === '3') {
      setIsPaymentLoading(true);
      await handlePayPal();
      return;
    }
  };

  return (
    <Modal
      isVisible
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
                {currency} {orderDetails?.homeServiceCharge}
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
            isLoading={isPaymentLoading}
            disabled={isPaymentLoading}
          />
          <CustomButton
            btnTitle={getTranslation('contactuspaymentmodel')}
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
