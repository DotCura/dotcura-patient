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
  //Static datastructure
  const NOTIFICATION_DATA = {
    email: [
      {
        id: 1,
        type: 'E',
        name: 'equipo',
        is_enabled: 1,
      },
      {
        id: 2,
        type: 'E',
        name: 'resultado_del_examen',
        is_enabled: 0,
      },
    ],
    sms: [
      {
        id: 3,
        type: 'S',
        name: 'revisión periódica',
        is_enabled: 0,
      },
      {
        id: 4,
        type: 'S',
        name: 'oferta relámpago',
        is_enabled: 0,
      },
    ],
    push: [
      {
        id: 5,
        type: 'P',
        name: 'cita',
        is_enabled: 0,
      },
      {
        id: 6,
        type: 'P',
        name: 'Seguimiento de enfermeras en tiempo real',
        is_enabled: 0,
      },
    ],
  };

  const [settingsSwitch, setSettingsSwitch] = useState<any>({
    email_24h: true,
    email_results: false,
    email_offers: false,
    email_tips: false,
    email_updates: false,

    sms_1h: true,
    sms_confirm: false,
    sms_periodic: false,
    sms_limited: false,
    sms_urgent: false,

    push_1h: false,
    push_tracking: false,
    push_results: false,
    push_suggestions: true,
    push_tips: true,
  });

  const toggleSwitchModel = (key: string) =>
    setSettingsSwitch({ ...settingsSwitch, [key]: !settingsSwitch[key] });

  //api valu
  const [notificationSettings, setNotificationSettings] =
    useState(NOTIFICATION_DATA);
  console.log('notificationSettings', notificationSettings);

  const toggleNotification = (type: 'email' | 'sms' | 'push', id: number) => {
    // Find the current item to get its current state
    const currentItem = notificationSettings[type].find(item => item.id === id);

    if (currentItem) {
      // Calculate the new state
      const newIsEnabled = currentItem.is_enabled === 1 ? 0 : 1;

      // Update local state
      setNotificationSettings(prevSettings => ({
        ...prevSettings,
        [type]: prevSettings[type].map(item =>
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
        showLoader:false,
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
      toggleSwitchModel={toggleSwitchModel}
      settingsSwitch={settingsSwitch}
      // api valo
      notificationSettings={notificationSettings}
      toggleNotification={toggleNotification}
    />
  );
};

export default NotificationSwitchContainer;
