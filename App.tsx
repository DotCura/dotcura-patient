import { LogBox } from 'react-native';
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
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreAllLogs();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState<string | null>(
    ScreenNames.RESULTOPENUPCONTAINER,
  );
  console.log('Initial Route Name:', initialRouteName);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();

  const flashMessageRef = useRef(null);
  setFlashMessageRef(flashMessageRef);

  return (
    <SafeAreaProvider>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <I18nextProvider i18n={i18n}>
          <AppLayout isOrderPlaced={orderStatus}>
            <MainNavigation initialRouteName={initialRouteName} />
          </AppLayout>
          <FlashMessage ref={flashMessageRef} position="top" floating={true} />
        </I18nextProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
