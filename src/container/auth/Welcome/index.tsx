import React, { useState } from 'react';

import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeComponent from '../../../components/auth/Welcome';

const WelcomeContainer = () => {
  const insets = useSafeAreaInsets();

  return <WelcomeComponent insets={insets} />;
};

export default WelcomeContainer;
