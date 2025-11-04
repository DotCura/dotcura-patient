import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MainNavigation from './src/navigators/stackNavigator';
import { ScreenNames } from './src/constants/AppConstants';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n/i18n.config';

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState<string | null>(
    ScreenNames.ONBOARDINGCONTAINER,
  );

  return (
    <KeyboardProvider statusBarTranslucent>
      <I18nextProvider i18n={i18n}>
        <View style={{ flex: 1 }}>
          <MainNavigation initialRouteName={initialRouteName} />
        </View>
      </I18nextProvider>
    </KeyboardProvider>
  );
};

export default App;
