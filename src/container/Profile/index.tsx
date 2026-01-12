import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import AppHeader from '../../global/Header';
import ProfileComponent from '../../components/Profile';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  activityOpacity,
  appName,
  currency,
  flashMessageSucess,
} from '../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { ScreenNames } from '../../constants/AppConstants';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { ZustandStores } from '../../store';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';
import { GlobalVar } from '../../constants/GlobalVar';

const ProfileContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  console.log("GlobalVar.terms_and_conditions_es",GlobalVar.terms_and_conditions_es);
  

  const data = [
    {
      id: '1',
      title: getTranslation('orderhistoryprofile'),
      image: images.imgcartclock,
      onpressfun: () => {
        // setIsShowOrderHistoryModel(true);
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
      id: '3',
      title: getTranslation('access'),
      image: images.imgWarningProfile,
      onpressfun: () => {
        navigation.navigate(ScreenNames.ACCESSCONTAINER);
      },
      iscurv: true,
    },
    // {
    //   id: '4',
    //   title: getTranslation('paymentmethod'),
    //   image: images.imgCard,
    //   onpressfun: () => {
    //     navigation.navigate(ScreenNames.PAYMENTMETHODCONTAINER);
    //   },
    //   iscurv: true,
    // },
    {
      id: '5',
      title: getTranslation('addresss'),
      image: images.imgAddressProfile,
      onpressfun: () => {
        navigation.navigate(ScreenNames.ADDRESSLISTCONTAINER);
      },
      iscurv: true,
    },
  ];
  const dataTwo = [
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
  ];
  const dataThree = [
    {
      id: '1',
      title: getTranslation('supportprofile'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('suppoet');
      },
      iscurv: false,
    },
    {
      id: '2',
      title: getTranslation('rateapp'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('rate');
      },
      iscurv: false,
    },
  ];

  const [fullName, setFullName] = useState('Giovanni Carnevale');
  const [memberSince, setMemberSince] = useState('2025');

  const handleNavigation = () => {
    setOrderStatus('');
    MmkvManager.clearAllExcept([MmkvManager.Keys.isOnBoardingVisisted]);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.WELCOMECONTAINER }],
      }),
    );
  };

  const handleNavigateAddFamily = () => {
    navigation.navigate(ScreenNames.ADDFAMILYCONTAINER);
  };

  const handleNavigateAccount = () => {
    navigation.navigate(ScreenNames.ACCOUNTCONTAINER);
  };

  const handlePressLogout = () => {
    Alert.alert(appName, getTranslation('logoutText') || '|| ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: _logoutApi },
    ]);
  };

  const handlePressDeleteAccount = () => {
    Alert.alert(appName, getTranslation('deleteText') || '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: _deleteAccountApi },
    ]);
  };

  const header = () => {
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
  };

  useEffect(() => {
    header();
  }, []);

  // ========================== API ==========================

  // Api Logout
  const _logoutApi = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          handleNavigation();
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
  };

  // Api Delete User
  const _deleteAccountApi = async () => {
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
  };

  //=== ProfileFocus ====
  useFocusEffect(
    useCallback(() => {
      MmkvManager.getData(MmkvManager.Keys.userDetails, (value: any) => {
        console.log('Profile Data of user', value);
        setFullName(value.name);
        const createdAt = value?.created_at;
        setMemberSince(String(new Date(createdAt).getFullYear()));
      });

      return () => {};
    }, []),
  );

  return (
    <ProfileComponent
      navigation={navigation}
      handleNavigateAccount={handleNavigateAccount}
      handlePressDeleteAccount={handlePressDeleteAccount}
      handlePressLogout={handlePressLogout}
      fullName={fullName}
      memberSince={memberSince}
      data={data}
      dataTwo={dataTwo}
      dataThree={dataThree}
      insets={insets}
      handleNavigateAddFamily={handleNavigateAddFamily}
    />
  );
};

export default ProfileContainer;
