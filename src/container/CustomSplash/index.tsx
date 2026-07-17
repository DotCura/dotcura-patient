import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { ScreenNames } from '../../constants/AppConstants';
import CustomSplash from '../../components/CustomSplash';
import {
  openedFromNotification,
  setOpenedFromNotification,
} from '../../constants/GConstant';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const CustomSplashContainer = ({ navigation }: any) => {
  const [showBiometricOverlay, setShowBiometricOverlay] = useState(false);
  const [biometricError, setBiometricError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.BOTTOMTABNAVIGATION }],
      }),
    );
  };

  const triggerBiometric = async () => {
    try {
      setIsAuthenticating(true);
      setBiometricError('');

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Conferma identità',
        cancelButtonText: 'Annulla',
        fallbackPromptMessage: 'Usa il codice',
      });

      if (success) {
        goHome();
      } else {
        setBiometricError('Autenticazione non riuscita. Riprova.');
      }
    } catch (err: any) {
      const msg: string = err?.message ?? '';
      if (
        msg.includes('cancel') ||
        msg.includes('Cancel') ||
        msg.includes('dismissed') ||
        msg.includes('user cancel')
      ) {
        setBiometricError(
          'Autenticazione annullata. Premi il pulsante per riprovare.',
        );
      } else if (
        msg.includes('not available') ||
        msg.includes('not enrolled')
      ) {
        setBiometricError(
          'Biometria non configurata. Abilita Face ID nelle Impostazioni.',
        );
      } else {
        setBiometricError('Errore biometrico. Riprova.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const navigateNext = () => {
    MmkvManager.getData(
      MmkvManager.Keys.isOnBoardingVisisted,
      isOnBoardingVisited => {
        if (isOnBoardingVisited) {
          MmkvManager.getData(MmkvManager.Keys.isLoggedIn, isLoginVisited => {
            if (!isLoginVisited) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: ScreenNames.WELCOMECONTAINER }],
                }),
              );
              return;
            }

            MmkvManager.getData(
              MmkvManager.Keys.biometricEnabled,
              biometricEnabled => {
                if (biometricEnabled === true || biometricEnabled === 'true') {
                  setShowBiometricOverlay(true);
                  triggerBiometric();
                } else {
                  goHome();
                }
              },
            );
          });
        } else {
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
      setOpenedFromNotification(false);
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

  return (
    <CustomSplash
      showBiometricOverlay={showBiometricOverlay}
      biometricError={biometricError}
      isAuthenticating={isAuthenticating}
      onRetry={triggerBiometric}
    />
  );
};

export default CustomSplashContainer;
