import React, { useState } from 'react';

import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WelcomeComponent from '../../../components/auth/Welcome';
import { ScreenNames } from '../../../constants/AppConstants';
import { GlobalVar } from '../../../constants/GlobalVar';

const WelcomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const handleNavigateLogin = () => {
    navigation.navigate(ScreenNames.LOGINCONTAINER);
  };
  const handleNavigateTerms = () => {
    navigation.navigate(ScreenNames.CMSPAGECONTAINER, {
      cmsUrl: GlobalVar.terms_and_conditions_es,
    });
  };
  const handleNavigatePrivacy = () => {
    navigation.navigate(ScreenNames.CMSPAGECONTAINER, {
      cmsUrl: GlobalVar.privacy_policy_es,
    });
  };

  return (
    <WelcomeComponent
      insets={insets}
      handleNavigateLogin={handleNavigateLogin}
      handleNavigateTerms={handleNavigateTerms}
      handleNavigatePrivacy={handleNavigatePrivacy}
    />
  );
};

export default WelcomeContainer;
