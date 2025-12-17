import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import NotificationSwitchComponent from '../../../components/auth/NotificationSwitch';
import AppHeader from '../../../global/Header';
import { getTranslation } from '../../../localization/i18n/i18n.config';

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
  // const [notificationSettings, setNotificationSettings] = useState(NOTIFICATION_DATA);
  // console.log('notificationSettings', notificationSettings);

  // const toggleNotification = (type: 'email' | 'sms' | 'push', id: number) => {
  //   setNotificationSettings(prevSettings => ({
  //     ...prevSettings,
  //     [type]: prevSettings[type].map(item =>
  //       item.id === id
  //         ? {
  //             ...item,
  //             is_enabled: item.is_enabled === 1 ? 0 : 1,
  //           }
  //         : item,
  //     ),
  //   }));
  // };

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
  return (
    <NotificationSwitchComponent
    navigation={navigation}
      toggleSwitchModel={toggleSwitchModel}
      settingsSwitch={settingsSwitch}
      // api valo
      // notificationSettings={notificationSettings}
      // toggleNotification={toggleNotification}
    />
  );
};

export default NotificationSwitchContainer;
