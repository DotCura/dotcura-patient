import React, { useState } from 'react';

import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeComponent from '../../../components/auth/Welcome';
import { ScreenNames } from '../../../constants/AppConstants';

const WelcomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const handleNavigateLogin = () => {
    // navigation.navigate(ScreenNames.LOGINCONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.LOGINCONTAINER,
    });
  };

  return (
    <WelcomeComponent
      insets={insets}
      handleNavigateLogin={handleNavigateLogin}
    />
  );
};

export default WelcomeContainer;
