import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import MainNavigation from './src/navigators/stackNavigator';
import { ScreenNames } from './src/constants/AppConstants';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n/i18n.config';
import FlashMessage from 'react-native-flash-message';
import { setFlashMessageRef } from './src/constants/GConstant';

LogBox.ignoreAllLogs();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState<string | null>(
    ScreenNames.BOTTOMTABNAVIGATION,
  );
  const flashMessageRef = useRef(null);
  setFlashMessageRef(flashMessageRef);

  return (
    <KeyboardProvider statusBarTranslucent>
      <I18nextProvider i18n={i18n}>
        <View style={{ flex: 1 }}>
          <MainNavigation initialRouteName={initialRouteName} />
        </View>
        <FlashMessage ref={flashMessageRef} position="top" floating={true} />
      </I18nextProvider>
    </KeyboardProvider>
  );
};

export default App;
