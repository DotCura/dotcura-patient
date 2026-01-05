import React, { useState } from 'react';
import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllSetComponent from '../../../components/auth/AllSet';
import { ScreenNames } from '../../../constants/AppConstants';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { CommonActions } from '@react-navigation/native';

const AllSetContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const handleNavigateToBottomTab = () => {
    MmkvManager.setData(MmkvManager.Keys.isLoggedIn, 'true');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.BOTTOMTABNAVIGATION }],
      }),
    );
  };

  return (
    <AllSetComponent
      insets={insets}
      handleNavigateToBottomTab={handleNavigateToBottomTab}
    />
  );
};

export default AllSetContainer;
