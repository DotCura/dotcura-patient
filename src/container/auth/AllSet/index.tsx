import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllSetComponent from '../../../components/auth/AllSet';
import { ScreenNames } from '../../../constants/AppConstants';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { CommonActions } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { flashMessageSucess, flashMessageWarning } from '../../../constants/GConstant';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

const AllSetContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [showFaceLockModal, setShowFaceLockModal] = useState(false);

  const goToHome = () => {
    MmkvManager.setData(MmkvManager.Keys.isLoggedIn, 'true');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.BOTTOMTABNAVIGATION }],
      }),
    );
  };

  const handleNavigateToBottomTab = () => {
    setShowFaceLockModal(true);
  };

  const handleEnableFaceLock = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Conferma per abilitare la biometria',
        cancelButtonText: 'Annulla',
        fallbackPromptMessage: 'Usa il codice',
      });
      if (success) {
        MmkvManager.setData(MmkvManager.Keys.biometricEnabled, 'true');
        flashMessageSucess('Biometria abilitata');
        setShowFaceLockModal(false);
        goToHome();
      }
    } catch {
      flashMessageWarning('Autenticazione annullata o non disponibile.');
    }
  };

  const handleSkipFaceLock = () => {
    MmkvManager.setData(MmkvManager.Keys.biometricEnabled, 'false');
    setShowFaceLockModal(false);
    goToHome();
  };

  return (
    <AllSetComponent
      insets={insets}
      handleNavigateToBottomTab={handleNavigateToBottomTab}
      showFaceLockModal={showFaceLockModal}
      onEnableFaceLock={handleEnableFaceLock}
      onSkipFaceLock={handleSkipFaceLock}
    />
  );
};

export default AllSetContainer;
