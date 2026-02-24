import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { ScreenNames } from '../../constants/AppConstants';
import CustomSplash from '../../components/CustomSplash';
import { openedFromNotification } from '../../constants/GConstant';

const CustomSplashContainer = ({ navigation }: any) => {
  const navigateNext = () => {
    MmkvManager.getData(
      MmkvManager.Keys.isOnBoardingVisisted,
      isOnBoardingVisited => {
        if (isOnBoardingVisited) {
          // Onboarding visited → check login
          MmkvManager.getData(MmkvManager.Keys.isLoggedIn, isLoginVisited => {
            const targetRoute = isLoginVisited
              ? ScreenNames.BOTTOMTABNAVIGATION
              : ScreenNames.WELCOMECONTAINER;

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: targetRoute }],
              }),
            );
          });
        } else {
          // Onboarding not visited
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.INTROCONTAINER }],
            }),
          );
        }
      },
    );
  };

  useEffect(() => {
    if (openedFromNotification) {
      // Skip delay if opened from notification
      navigateNext();
      return;
    }
    const timer = setTimeout(
      () => {
        navigateNext();
      },
      Platform.OS === 'android' ? 4500 : 4500,
    );

    return () => clearTimeout(timer);
  }, []);

  return <CustomSplash />;
};

export default CustomSplashContainer;
