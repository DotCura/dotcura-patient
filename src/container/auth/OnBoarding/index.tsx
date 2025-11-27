import React, { useRef, useState } from 'react';

import OnBoardingComponent from '../../../components/auth/OnBoarding';
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

const OnBoardingContainer = ({ navigation }: any) => {
  const onBoardingArr = [
    {
      title: getTranslation('onboardingtitle1'),
      subtitle: getTranslation('onboardingdes1'),
      image: images.imgOmBoarding2,
    },
    {
      title: getTranslation('onboardingtitle2'),
      subtitle: getTranslation('onboardingdes2'),
      image: images.imgOmBoarding3,
    },
    {
      title: getTranslation('onboardingtitle3'),
      subtitle: getTranslation('onboardingdes3'),
      image: images.imgOmBoarding4,
    },
    {
      title: getTranslation('onboardingtitle4'),
      subtitle: getTranslation('onboardingdes4'),
      image: images.imgOmBoarding5,
    },
  ];

  const insets = useSafeAreaInsets();
  const [onBoardingArrData, setOnBoardingArrData] = useState(onBoardingArr);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Detect page index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ScreenDimensions.screenWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < onBoardingArr.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate(ScreenNames.WELCOMECONTAINER);
      MmkvManager.setData(MmkvManager.Keys.isOnBoardingVisisted, 'true');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    } else {
      console.log('back');

      navigation.goBack();
    }
  };

  const handleSkip = () => {
    navigation.navigate(ScreenNames.WELCOMECONTAINER);
    MmkvManager.setData(MmkvManager.Keys.isOnBoardingVisisted, 'true');
  };

  return (
    <OnBoardingComponent
      insets={insets}
      onBoardingArrData={onBoardingArrData}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      handleScroll={handleScroll}
      handleNext={handleNext}
      flatListRef={flatListRef}
      navigation={navigation}
      handleSkip={handleSkip}
      handleBack={handleBack}
    />
  );
};

export default OnBoardingContainer;
