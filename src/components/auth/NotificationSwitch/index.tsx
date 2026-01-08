import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight } from '../../../constants/utils/Dimensions';
import ModalTitleSubtitle from '../../../global/TitleSubtitleModel';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import AppHeader from '../../../global/Header';
import { isPlatformiOS } from '../../../constants/AppConstants';

const NotificationSwitchComponent = (props: any) => {
  const SettingItem = ({ label, value, onToggle }: any) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemLabel} numberOfLines={2}>
        {label}
      </Text>
      <Switch
        style={{ alignSelf: 'center' }}
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.grey7816, true: Colors.purple33 }}
        ios_backgroundColor="#ccc"
        thumbColor={Colors.white}
      />
    </View>
  );
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={true}
        showSubTitle={false}
        showEndBtn={false}
        centerTitle={getTranslation('notifications')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
        contentContainerStyle={{
          paddingBottom: getHeight(50),
          backgroundColor: Colors.whiteF2,
        }}
      >
        {/* ---------------- EMAIL ---------------- */}
        <View style={{ marginTop: getHeight(24) }}>
          <ModalTitleSubtitle
            title={getTranslation('notificationemail')}
            subtitle={getTranslation('notificationemailsubtitle')}
            subtitleTwo={props.emailNotification}
            isAdd={true}
          />
        </View>
        <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
          {props?.notificationSettings?.email?.map((item: any) => (
            <SettingItem
              key={item.id}
              label={item.name}
              value={item.is_enabled === 1}
              onToggle={() => props.toggleNotification('email', item.id)}
            />
          ))}
        </View>

        {/* ---------------- SMS ---------------- */}
        <View style={{ marginTop: getHeight(24) }}>
          <ModalTitleSubtitle
            title={getTranslation('notificationsms')}
            subtitle={getTranslation('notificationsmssubtitle')}
            subtitleTwo={props.countryCodeWithMobileNumber}
            isAdd={true}
          />
        </View>
        <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
          {props?.notificationSettings?.sms?.map((item: any) => (
            <SettingItem
              key={item.id}
              label={item.name}
              value={item.is_enabled === 1}
              onToggle={() => props.toggleNotification('sms', item.id)}
            />
          ))}
        </View>

        {/* ---------------- PUSH ---------------- */}
        <View style={{ marginTop: getHeight(24) }}>
          <ModalTitleSubtitle
            title={getTranslation('notificationpush')}
            subtitle={''}
          />
        </View>
        <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
          {props?.notificationSettings?.push?.map((item: any) => (
            <SettingItem
              key={item.id}
              label={item.name}
              value={item.is_enabled === 1}
              onToggle={() => props.toggleNotification('push', item.id)}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default NotificationSwitchComponent;
