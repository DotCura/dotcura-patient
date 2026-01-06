import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import NotificationSwitchComponent from '../../../components/auth/NotificationSwitch';
import AppHeader from '../../../global/Header';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { flashMessageWarning } from '../../../constants/GConstant';
import { APIManager } from '../../../api/APIManager';

const NotificationSwitchContainer = ({ navigation }: any) => {
  const [notificationSettings, setNotificationSettings] = useState<any>({
    email: [],
    sms: [],
    push: [],
  });
  console.log('notificationSettings', notificationSettings);

  const toggleNotification = (type: 'email' | 'sms' | 'push', id: number) => {
    // Find the current item to get its current state
    const currentItem = notificationSettings[type].find((item:any) => item.id === id);

    if (currentItem) {
      // Calculate the new state
      const newIsEnabled = currentItem.is_enabled === 1 ? 0 : 1;

      // Update local state
      setNotificationSettings((prevSettings:any) => ({
        ...prevSettings,
        [type]: prevSettings[type].map((item:any) =>
          item.id === id
            ? {
                ...item,
                is_enabled: newIsEnabled,
              }
            : item,
        ),
      }));

      // Call the API with the notification ID and new state
      _addUpdateNotificationApi(id, newIsEnabled);
    }
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
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
          centerTitle={getTranslation('notifications')}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //=========================== API ========================================

  const _notificationSwitchApi = async () => {
    try {
      const params = {};
      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api NOTIFICATIONTYPE');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          setNotificationSettings(responseData.data);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.SETTINGS.GETNOTIFICATIONTYPE,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  const _addUpdateNotificationApi = async (
    notificationTypeId: any,
    is_active: any,
  ) => {
    try {
      const params = {
        notification_type_id: notificationTypeId.toString(),
        is_active: is_active.toString(),
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api Add Update Notification');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.SETTINGS.ADDUPDATENOTICATIONTYPE,
        callback,
        showLoader: false,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('add update notification error:', error);
    }
  };

  useEffect(() => {
    _notificationSwitchApi();
  }, []);

  return (
    <NotificationSwitchComponent
      navigation={navigation}
      notificationSettings={notificationSettings}
      toggleNotification={toggleNotification}
    />
  );
};

export default NotificationSwitchContainer;
