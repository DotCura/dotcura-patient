import React, { useRef, useState } from 'react';

import { getTranslation } from '../../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ScreenDimensions } from '../../../constants/utils/Dimensions';
import { ScreenNames } from '../../../constants/AppConstants';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { images } from '../../../constants/Images';
import IntroComponent from '../../../components/auth/Intro';

const IntroContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    navigation.navigate(ScreenNames.ONBOARDINGCONTAINER);
    // MmkvManager.setData(MmkvManager.Keys.isOnBoardingVisisted, 'true');
  };

  const handleSkip = () => {
    navigation.navigate(ScreenNames.ONBOARDINGCONTAINER);
    // MmkvManager.setData(MmkvManager.Keys.isOnBoardingVisisted, 'true');
  };

  return (
    <IntroComponent
      insets={insets}
      handleNext={handleNext}
      navigation={navigation}
      handleSkip={handleSkip}
    />
  );
};

export default IntroContainer;
