import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import NotificationSwitchComponent from '../../../components/auth/NotificationSwitch';
import AppHeader from '../../../global/Header';
import { getTranslation } from '../../../localization/i18n/i18n.config';

const NotificationSwitchContainer = ({ navigation }: any) => {
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
      toggleSwitchModel={toggleSwitchModel}
      settingsSwitch={settingsSwitch}
    />
  );
};

export default NotificationSwitchContainer;
