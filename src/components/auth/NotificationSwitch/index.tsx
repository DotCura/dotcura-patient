import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight } from '../../../constants/utils/Dimensions';
import ModalTitleSubtitle from '../../../global/TitleSubtitleModel';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';

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
      />
    </View>
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: getHeight(50) }}
    >
      {/* ---------------- EMAIL ---------------- */}
      <View style={{ marginTop: getHeight(24) }}>
        <ModalTitleSubtitle
          title={getTranslation('notificationemail')}
          subtitle={getTranslation('notificationemailsubtitle')}
          subtitleTwo={'giovanni.carnevale@email.it'}
          isAdd={true}
        />
      </View>
      <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
        <SettingItem
          label={getTranslation('emailswitch1')}
          value={props.settingsSwitch.email_24h}
          onToggle={() => props.toggleSwitchModel('email_24h')}
        />
        <SettingItem
          label={getTranslation('emailswitch2')}
          value={props.settingsSwitch.email_results}
          onToggle={() => props.toggleSwitchModel('email_results')}
        />
        <SettingItem
          label={getTranslation('emailswitch3')}
          value={props.settingsSwitch.email_offers}
          onToggle={() => props.toggleSwitchModel('email_offers')}
        />
        <SettingItem
          label={getTranslation('emailswitch4')}
          value={props.settingsSwitch.email_tips}
          onToggle={() => props.toggleSwitchModel('email_tips')}
        />
        <SettingItem
          label={getTranslation('emailswitch5')}
          value={props.settingsSwitch.email_updates}
          onToggle={() => props.toggleSwitchModel('email_updates')}
        />
      </View>

      {/* ---------------- SMS ---------------- */}
      <View style={{ marginTop: getHeight(24) }}>
        <ModalTitleSubtitle
          title={getTranslation('notificationsms')}
          subtitle={getTranslation('notificationsmssubtitle')}
          subtitleTwo={'+39' + '333 000 00 00'}
          isAdd={true}
        />
      </View>
      <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
        <SettingItem
          label={getTranslation('smsswitch1')}
          value={props.settingsSwitch.sms_1h}
          onToggle={() => props.toggleSwitchModel('sms_1h')}
        />
        <SettingItem
          label={getTranslation('smsswitch2')}
          value={props.settingsSwitch.sms_confirm}
          onToggle={() => props.toggleSwitchModel('sms_confirm')}
        />
        <SettingItem
          label={getTranslation('smsswitch3')}
          value={props.settingsSwitch.sms_periodic}
          onToggle={() => props.toggleSwitchModel('sms_periodic')}
        />
        <SettingItem
          label={getTranslation('smsswitch4')}
          value={props.settingsSwitch.sms_limited}
          onToggle={() => props.toggleSwitchModel('sms_limited')}
        />
        <SettingItem
          label={getTranslation('smsswitch5')}
          value={props.settingsSwitch.sms_urgent}
          onToggle={() => props.toggleSwitchModel('sms_urgent')}
        />
      </View>

      {/* ---------------- PUSH ---------------- */}
      <View style={{ marginTop: getHeight(24) }}>
        <ModalTitleSubtitle
          title={getTranslation('notificationpush')}
          subtitle={''}
        />
      </View>
      <View style={{ gap: getHeight(8), marginTop: getHeight(20) }}>
        <SettingItem
          label={getTranslation('pushswitch1')}
          value={props.settingsSwitch.push_1h}
          onToggle={() => props.toggleSwitchModel('push_1h')}
        />
        <SettingItem
          label={getTranslation('pushswitch2')}
          value={props.settingsSwitch.push_tracking}
          onToggle={() => props.toggleSwitchModel('push_tracking')}
        />
        <SettingItem
          label={getTranslation('pushswitch3')}
          value={props.settingsSwitch.push_results}
          onToggle={() => props.toggleSwitchModel('push_results')}
        />
        <SettingItem
          label={getTranslation('pushswitch4')}
          value={props.settingsSwitch.push_suggestions}
          onToggle={() => props.toggleSwitchModel('push_suggestions')}
        />
        <SettingItem
          label={getTranslation('pushswitch5')}
          value={props.settingsSwitch.push_tips}
          onToggle={() => props.toggleSwitchModel('push_tips')}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationSwitchComponent;
