import React, { useState } from 'react';
import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllSetComponent from '../../../components/auth/AllSet';
import { ScreenNames } from '../../../constants/AppConstants';

const AllSetContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const handleNavigateToBottomTab = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION);
  };

  return (
    <AllSetComponent
      insets={insets}
      handleNavigateToBottomTab={handleNavigateToBottomTab}
    />
  );
};

export default AllSetContainer;
