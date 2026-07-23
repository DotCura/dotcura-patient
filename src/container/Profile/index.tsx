import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import AppHeader from '../../global/Header';
import ProfileComponent from '../../components/Profile';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { Alert, Linking, Platform } from 'react-native';
import {
  appName,
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

import { ScreenNames } from '../../constants/AppConstants';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { ZustandStores } from '../../store';
import { ApiEndPoints, MethodType, StatusCode, toggleLoader } from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';
import { GlobalVar } from '../../constants/GlobalVar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePaymentStore } from '../../store/PaymentStore/PaymentStore';
import { downloadZipFile } from '../../constants/utils/DownloadHelper';

const ProfileContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { setOrderStatus } = ZustandStores.OrderstatusStore();
  const { resetCart, resetNotificationCount } = ZustandStores.CartStore();
  const { clearOrderData } = ZustandStores.OrderstatusStore();
  const { logout } = ZustandStores.UserStore();

  const [fullName, setFullName] = useState('Giovanni Carnevale');
  const [memberSince, setMemberSince] = useState('2025');
  const [countrycode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState<any>(false);
  const [exportState, setExportState] = useState<
    'NONE' | 'PROCESSING' | 'READY' | 'EXPIRED'
  >('NONE');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleNavigation = useCallback(() => {
    setOrderStatus('');
    MmkvManager.clearAllExcept([MmkvManager.Keys.isOnBoardingVisisted]);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.WELCOMECONTAINER }],
      }),
    );
  }, [navigation, setOrderStatus]);

  // Api Logout
  const _logoutApi = useCallback(async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          handleNavigation();
          resetCart();
          resetNotificationCount();
          clearOrderData();
          usePaymentStore.getState().resetAll();
          logout();
          await AsyncStorage.removeItem('cart-store');
          await AsyncStorage.removeItem('payment-store');
          flashMessageSucess(responseData.message);
        } else {
          flashMessageSucess(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.SETTINGS.LOGOUT,
        callback,
        params,
      });
    } catch (error) {
      console.log('LogOut error:', error);
    }
  }, [
    navigation,
    handleNavigation,
    resetCart,
    resetNotificationCount,
    clearOrderData,
    logout,
  ]);

  // Api Delete User
  const _deleteAccountApi = useCallback(async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          handleNavigation();
        } else {
          flashMessageSucess(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.SETTINGS.DELETEACCOUNT,
        callback,
        params,
      });
    } catch (error) {
      console.log('Delete User error:', error);
    }
  }, [navigation, handleNavigation]);

  const handlePressLogout = useCallback(() => {
    Alert.alert(appName, getTranslation('logoutText') || '|| ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: _logoutApi },
    ]);
  }, [_logoutApi]);

  const handlePressDeleteAccount = useCallback(() => {
    Alert.alert(appName, getTranslation('deleteText') || '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: _deleteAccountApi },
    ]);
  }, [_deleteAccountApi]);

  const handleNavigateAddFamily = useCallback(() => {
    navigation.navigate(ScreenNames.ADDFAMILYCONTAINER);
  }, [navigation]);

  const handleNavigateAccount = useCallback(() => {
    navigation.navigate(ScreenNames.ACCOUNTCONTAINER);
  }, [navigation]);

  const handleToggleBiometric = useCallback(async (value: boolean) => {
    if (value) {
      try {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: 'Conferma per abilitare la biometria',
          cancelButtonText: 'Annulla',
          fallbackPromptMessage: 'Usa il codice',
        });
        if (success) {
          MmkvManager.setData(MmkvManager.Keys.biometricEnabled, 'true');
          setBiometricEnabled(true);
          flashMessageSucess('Biometria abilitata');
        }
      } catch {
        flashMessageWarning('Autenticazione annullata o non disponibile.');
      }
    } else {
      MmkvManager.setData(MmkvManager.Keys.biometricEnabled, 'false');
      setBiometricEnabled(false);
      flashMessageSucess('Biometria disabilitata');
    }
  }, []);

  const handleRateApp = useCallback(async () => {
    const appId = '6759791247';
    const packageName = 'com.dotcura.app';

    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL(
          `itms-apps://itunes.apple.com/app/id${appId}?action=write-review`,
        );
      } else {
        await Linking.openURL(`market://details?id=${packageName}`);
      }
    } catch (error) {
      const fallbackUrl =
        Platform.OS === 'ios'
          ? `https://apps.apple.com/app/id${appId}`
          : `https://play.google.com/store/apps/details?id=${packageName}`;

      Linking.openURL(fallbackUrl);
    }
  }, []);

  const data = useMemo(
    () => [
      {
        id: '1',
        title: getTranslation('orderhistoryprofile'),
        image: images.imgcartclock,
        onpressfun: () => {
          navigation.navigate(ScreenNames.ORDERHISTORYCONTAINER);
        },
        iscurv: true,
      },
      {
        id: '6',
        title: getTranslation('favourite'),
        image: images.imgFavProfile,
        onpressfun: () => {
          console.log('fav');
          navigation.navigate(ScreenNames.FAVOURITESCONTAINER);
        },
        iscurv: true,
      },
      {
        id: '2',
        title: getTranslation('notificationsprofile'),
        image: images.imgBell,
        onpressfun: () => {
          navigation.navigate(ScreenNames.NOTIFICATIONSWITCHCONTAINER);
        },
        iscurv: true,
      },
      {
        id: '4',
        title: getTranslation('paymentmethod'),
        image: images.imgCard,
        onpressfun: () => {
          navigation.navigate(ScreenNames.PAYMENTMETHODCONTAINER);
        },
        iscurv: true,
      },
      {
        id: '5',
        title: getTranslation('addresss'),
        image: images.imgAddressProfile,
        onpressfun: () => {
          navigation.navigate(ScreenNames.ADDRESSLISTCONTAINER);
        },
        iscurv: true,
      },
      {
        id: '7',
        title: getTranslation('consentProfile') || 'Consensi',
        image: images.imgWarningProfile,
        onpressfun: () => {
          navigation.navigate(ScreenNames.CONSENTLISTCONTAINER);
        },
        iscurv: true,
      },
    ],
    [navigation],
  );

  const dataTwo = useMemo(
    () => [
      {
        id: '2',
        title: getTranslation('termsandconditions'),
        image: images.imgShareProfile,
        onpressfun: () => {
          navigation.navigate(ScreenNames.CMSPAGECONTAINER, {
            cmsUrl: GlobalVar.terms_and_conditions_es,
          });
        },
        iscurv: false,
      },
      {
        id: '3',
        title: getTranslation('privacypolicy'),
        image: images.imgShareProfile,
        onpressfun: () => {
          navigation.navigate(ScreenNames.CMSPAGECONTAINER, {
            cmsUrl: GlobalVar.privacy_policy_es,
          });
        },
        iscurv: false,
      },
    ],
    [navigation],
  );

  const dataThree = useMemo(
    () => [
      {
        id: '1',
        title: getTranslation('supportprofile'),
        image: images.imgShareProfile,
        onpressfun: () => {
          navigation.navigate(ScreenNames.CONTACTUSCONTAINER);
        },
        iscurv: false,
      },
      {
        id: '2',
        title: getTranslation('rateapp'),
        image: images.imgShareProfile,
        onpressfun: () => {
          handleRateApp();
        },
        iscurv: false,
      },
    ],
    [navigation, handleRateApp],
  );

  const header = useCallback(() => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={true}
          isNotificationIcon={true}
          NotificationPressFun={() => {
            navigation.navigate(ScreenNames.NOTIFICATIONLISTCONTAINER);
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    header();
  }, [header]);

  // Api Export Status & Triggering
  const _getExportStatus = useCallback(
    async (showLoading = false) => {
      try {
        const callback = (res: any) => {
          if (!res) return;
          if (
            res.code === StatusCode.SUCCESS &&
            res.message === 'EXPORT_FETCHED_SUCCESSFULLY'
          ) {
            setExportState('READY');
            setDownloadUrl(res.data.download_url);
            setFileName(res.data.file_name);
          } else if (
            res.code === StatusCode.SUCCESS &&
            res.message === 'DATA_EXPORT_PROCESSING'
          ) {
            setExportState('PROCESSING');
          } else if (
            res.code === StatusCode.NO_DATA_FOUND &&
            res.message === 'EXPORT_EXPIRED'
          ) {
            setExportState('EXPIRED');
          } else if (
            res.code === StatusCode.NO_DATA_FOUND &&
            res.message === 'NO_EXPORT_AVAILABLE'
          ) {
            setExportState('NONE');
          }
        };

        await APIManager.makeRequest({
          navigation: navigation,
          method: MethodType.GET,
          apiEndPoint: ApiEndPoints.SETTINGS.DATA_EXPORT_LATEST,
          callback,
          showLoader: showLoading,
        });
      } catch (error) {
        console.log('Error checking export status:', error);
      }
    },
    [navigation],
  );

  const _requestExport = useCallback(async () => {
    try {
      const callback = (res: any) => {
        if (res && res.code === StatusCode.SUCCESS) {
          setExportState('PROCESSING');
          flashMessageSucess(res.message);
        } else {
          flashMessageWarning(res?.message || getTranslation('exportError'));
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.SETTINGS.DATA_EXPORT,
        callback,
        params: {},
      });
    } catch (error) {
      console.log('Error requesting export:', error);
    }
  }, [navigation]);

  const _downloadExport = useCallback(async () => {
    if (downloadUrl && fileName) {
      try {
        toggleLoader(true);
        await downloadZipFile(downloadUrl, fileName);
      } catch (error) {
        console.log('Download error:', error);
      } finally {
        toggleLoader(false);
      }
    } else {
      flashMessageWarning(getTranslation('downloadLinkNotReady'));
    }
  }, [downloadUrl, fileName]);

  //=== ProfileFocus ====
  useFocusEffect(
    useCallback(() => {
      _getExportStatus(false);
      MmkvManager.getData(MmkvManager.Keys.userDetails, (value: any) => {
        console.log('Profile Data of user', value);
        setFullName(value.name);
        setCountryCode(value.country_code);
        setPhoneNumber(value.phone_number);
        const createdAt = value?.created_at;
        setMemberSince(String(new Date(createdAt).getFullYear()));
      });
      MmkvManager.getData(MmkvManager.Keys.biometricEnabled, (val: any) => {
        setBiometricEnabled(val === true || val === 'true');
      });
      return () => {};
    }, [_getExportStatus]),
  );

  return (
    <ProfileComponent
      navigation={navigation}
      handleNavigateAccount={handleNavigateAccount}
      handlePressDeleteAccount={handlePressDeleteAccount}
      handlePressLogout={handlePressLogout}
      fullName={fullName}
      memberSince={memberSince}
      countrycode={countrycode}
      phoneNumber={phoneNumber}
      data={data}
      dataTwo={dataTwo}
      dataThree={dataThree}
      insets={insets}
      handleNavigateAddFamily={handleNavigateAddFamily}
      biometricEnabled={biometricEnabled}
      onToggleBiometric={handleToggleBiometric}
      exportState={exportState}
      handleRequestExport={_requestExport}
      handleDownloadExport={_downloadExport}
    />
  );
};

export default ProfileContainer;
