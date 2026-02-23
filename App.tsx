// import { LogBox } from 'react-native';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import MainNavigation from './src/navigators/stackNavigator';
// import { ScreenNames } from './src/constants/AppConstants';
// import { KeyboardProvider } from 'react-native-keyboard-controller';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './src/localization/i18n/i18n.config';
// import FlashMessage from 'react-native-flash-message';
// import {
//   bootstrapUser,
//   flashMessageWarning,
//   setFlashMessageRef,
// } from './src/constants/GConstant';
// import AppLayout from './src/global/AppLayout';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { ZustandStores } from './src/store';
// import SplashScreen from 'react-native-splash-screen';
// import Loader from './src/api/Loader';
// import {
//   ApiEndPoints,
//   MethodType,
//   setLoaderRef,
//   StatusCode,
// } from './src/api/APIConstant';
// import { APIManager } from './src/api/APIManager';
// import { GlobalVar } from './src/constants/GlobalVar';
// import { useSocketConnection } from './src/socket/useSocketConnection';
// import { useFocusEffect } from '@react-navigation/native';
// import { MmkvManager } from './src/constants/utils/MmkvManager';

// LogBox.ignoreAllLogs();

// const App = ({ navigation }: any) => {
//   const [initialRouteName, setInitialRouteName] = useState<string | null>(
//     ScreenNames.CUSTOMSPLASHCONTAINER,
//   );

//   const orderStatus = ZustandStores.OrderstatusStore(state => state.orderStatus);
//   const patientId = ZustandStores.UserStore(state => state.patientId);

//   useSocketConnection(patientId);

//   const flashMessageRef = useRef(null);
//   setFlashMessageRef(flashMessageRef);

//   //GETCREDENTIALSAPI
//   const _getCredentials = async () => {
//     const params = {};

//     try {
//       const callback = async (responseData: any) => {
//         if (responseData.code === StatusCode.SUCCESS) {
//           GlobalVar.google_map_api_key_android =
//             responseData.data?.Android_MAP_KEY;
//           GlobalVar.google_map_api_key_ios = responseData.data?.IOS_MAP_KEY;
//           GlobalVar.privacy_policy_en =
//             responseData?.data?.cms_urls?.privacy_policy?.en;
//           GlobalVar.privacy_policy_es =
//             responseData?.data?.cms_urls?.privacy_policy?.es;
//           GlobalVar.terms_and_conditions_en =
//             responseData?.data?.cms_urls?.terms_and_conditions?.en;
//           GlobalVar.terms_and_conditions_es =
//             responseData?.data?.cms_urls?.terms_and_conditions?.es;
//         } else {
//           console.log('error credential');
//         }
//       };

//       await APIManager.makeRequest({
//         navigation,
//         method: MethodType.POST,
//         apiEndPoint: ApiEndPoints.SETTINGS.GETCREDENTIAALS,
//         callback,
//         showLoader: false,
//         params,
//       });
//     } catch (error) {
//       console.log('credentials details error:', error);
//     }
//   };

//   useEffect(() => {
//     _getCredentials();
//   }, []);

//   useEffect(() => {
//     bootstrapUser(); // 👈 ONE LINE MAGIC
//     SplashScreen.hide();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
//         <I18nextProvider i18n={i18n}>
//           <AppLayout isOrderPlaced={orderStatus}>
//             <MainNavigation initialRouteName={ScreenNames.CUSTOMSPLASHCONTAINER} />
//           </AppLayout>
//           <Loader ref={ref => setLoaderRef(ref)} />
//           <FlashMessage ref={flashMessageRef} position="top" floating={true} />
//         </I18nextProvider>
//       </KeyboardProvider>
//     </SafeAreaProvider>
//   );
// };

// export default App;

import { LogBox } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MainNavigation from './src/navigators/stackNavigator';
import { ScreenNames } from './src/constants/AppConstants';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n/i18n.config';
import FlashMessage from 'react-native-flash-message';
import {
  bootstrapUser,
  flashMessageWarning,
  setFlashMessageRef,
} from './src/constants/GConstant';
import AppLayout from './src/global/AppLayout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ZustandStores } from './src/store';
import SplashScreen from 'react-native-splash-screen';
import Loader from './src/api/Loader';
import {
  ApiEndPoints,
  MethodType,
  setLoaderRef,
  StatusCode,
} from './src/api/APIConstant';
import { APIManager } from './src/api/APIManager';
import { GlobalVar } from './src/constants/GlobalVar';
import { useSocketConnection } from './src/socket/useSocketConnection';
import { StripeProvider } from '@stripe/stripe-react-native';
import { usePaymentInitializer } from './src/global/PaymentModelHelper/usePaymentInitializer';
import { PaymentPendingModal } from './src/global/PaymentModelHelper/PaymentPendingModal';

LogBox.ignoreAllLogs();

const App = ({ navigation }: any) => {
  // 🔥 CRITICAL: Prevent re-renders by using ref for initialization
  const isAppInitialized = useRef(false);
  const hasHiddenSplash = useRef(false);

  const [initialRouteName] = useState<string>(
    ScreenNames.CUSTOMSPLASHCONTAINER,
  );

  // Get orderStatus but DON'T cause re-render during splash
  const orderStatus = ZustandStores.OrderstatusStore(
    state => state.orderStatus,
  );
  const patientId = ZustandStores.UserStore(state => state.patientId);

  // 🔥 IMPORTANT: Only connect socket AFTER splash is done
  const [shouldConnectSocket, setShouldConnectSocket] = useState(false);

  // Conditionally use socket hook
  useSocketConnection(shouldConnectSocket ? patientId : null);

  const flashMessageRef = useRef(null);
  setFlashMessageRef(flashMessageRef);

  // GETCREDENTIALSAPI - Run only once
  const _getCredentials = async () => {
    const params = {};

    try {
      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          GlobalVar.google_map_api_key_android =
            responseData.data?.Android_MAP_KEY;
          GlobalVar.google_map_api_key_ios = responseData.data?.IOS_MAP_KEY;
          GlobalVar.privacy_policy_en =
            responseData?.data?.cms_urls?.privacy_policy?.en;
          GlobalVar.privacy_policy_es =
            responseData?.data?.cms_urls?.privacy_policy?.es;
          GlobalVar.terms_and_conditions_en =
            responseData?.data?.cms_urls?.terms_and_conditions?.en;
          GlobalVar.terms_and_conditions_es =
            responseData?.data?.cms_urls?.terms_and_conditions?.es;
        } else {
          console.log('error credential');
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.SETTINGS.GETCREDENTIAALS,
        callback,
        showLoader: false,
        params,
      });
    } catch (error) {
      console.log('credentials details error:', error);
    }
  };

  // 🔥 Initialize app only once
  useEffect(() => {
    if (isAppInitialized.current) return;

    const initializeApp = async () => {
      console.log('🚀 Initializing app...');

      // Run all initialization tasks
      await Promise.all([bootstrapUser(), _getCredentials()]);

      isAppInitialized.current = true;

      // Hide splash only once
      if (!hasHiddenSplash.current) {
        console.log("splash screen hide");
        
        SplashScreen.hide();
        hasHiddenSplash.current = true;
      }

      // Enable socket connection AFTER splash
      setTimeout(() => {
        setShouldConnectSocket(true);
      }, 4600); // Small delay to ensure splash transition completes
    };

    initializeApp();
  }, []);

  // usePaymentInitializer(navigation);

  //jayshaikey:pk_test_51SSFGhEHGGgg2T7x7trk2rIV2mIoZo2u3jERAm2PXCPVYCBmCyjVynjpursvu49ixVQeZ4LjyqkuwX02RkmnDuFc00EpCuEJjI
  return (
    <StripeProvider
      publishableKey="pk_test_51SSEOACJL1MzBMMlLtkE5S91t0A9SfWFAPAI2PyPTuaXflMRIkfgT9sNee2uPPTBqxiSedyMDV4AFxlq6m63dyNS00zSzuaGdv"
      urlScheme="dotcura"
      merchantIdentifier="merchant.com.dotcura.app" // required for Apple Pay this is parth sir key
      setReturnUrlSchemeOnAndroid={true}
    >
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <I18nextProvider i18n={i18n}>
            <AppLayout isOrderPlaced={orderStatus}>
              <MainNavigation initialRouteName={initialRouteName} />
              {/* <PaymentPendingModal /> */}
            </AppLayout>
            <Loader ref={ref => setLoaderRef(ref)} />
            <FlashMessage
              ref={flashMessageRef}
              position="top"
              floating={true}
            />
          </I18nextProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </StripeProvider>
  );
};

export default App;
