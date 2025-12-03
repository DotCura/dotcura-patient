import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MainNavigation from './src/navigators/stackNavigator';
import { ScreenNames } from './src/constants/AppConstants';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n/i18n.config';
import FlashMessage from 'react-native-flash-message';
import { setFlashMessageRef } from './src/constants/GConstant';
import AppLayout from './src/global/AppLayout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ZustandStores } from './src/store';
import { MmkvManager } from './src/constants/utils/MmkvManager';

LogBox.ignoreAllLogs();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState<string | null>(ScreenNames.BOTTOMTABNAVIGATION);

  // useEffect(() => {
  //   MmkvManager.getData(
  //     MmkvManager.Keys.isOnBoardingVisisted,
  //     isOnBoardingVisited => {
  //       if (isOnBoardingVisited) {
  //         // Onboarding visited → check login
  //         MmkvManager.getData(MmkvManager.Keys.isLoggedIn, isLoginVisited => {
  //           if (isLoginVisited) {
  //             setInitialRouteName(ScreenNames.BOTTOMTABNAVIGATION); // Logged in
  //           } else {
  //             setInitialRouteName(ScreenNames.WELCOMECONTAINER); // Not logged in
  //           }
  //         });
  //       } else {
  //         setInitialRouteName(ScreenNames.ONBOARDINGCONTAINER); // Onboarding not visited
  //       }
  //     },
  //   );
  // }, []);

  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  // console.log('orderStatus in App.tsx:', orderStatus);

  const flashMessageRef = useRef(null);
  setFlashMessageRef(flashMessageRef);

  return (
    <SafeAreaProvider>
      <KeyboardProvider statusBarTranslucent>
        <I18nextProvider i18n={i18n}>
          <View style={{ flex: 1 }}>
            <AppLayout isOrderPlaced={orderStatus}>
              <MainNavigation initialRouteName={initialRouteName} />
            </AppLayout>
          </View>
          <FlashMessage ref={flashMessageRef} position="top" floating={true} />
        </I18nextProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
