import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Switch,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import {
  activityOpacity,
  currency,
  getInitials,
  getInitialsTwoDigit,
} from '../../constants/GConstant';
import { fontSize } from '../../constants/FontSizes';
import { constnatStyles } from '../../constants/Styles';
import AppHeader from '../../global/Header';
import ModalTitleSubtitle from '../../global/TitleSubtitleModel';
import { fontsfamily } from '../../constants/FontFamily';
import AddressModel from '../../global/AddressModel/AddressModel';
import { ScreenNames } from '../../constants/AppConstants';

const ProfileComponent = (props: any) => {
  const Item = ({ item, onPress }: any) => (
    <TouchableOpacity style={styles.itemContainer} onPress={item.onpressfun}>
      <Image source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  const ItemTwo = ({ item, onPress }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}
    >
      {/* <Image source={item.image} /> */}
      <Text style={[styles.title, { marginLeft: getWidth(28) }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const SettingItem = ({ label, value, onToggle }: any) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemLabel} numberOfLines={2}>
        {label}
      </Text>
      <Switch
        style={{ alignSelf: 'center' }}
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.grey7816, true: Colors.blue1C }}
        thumbColor={props.isEnabled ? Colors.white : Colors.white}
        ios_backgroundColor="#ccc"
      />
    </View>
  );
  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={[
        constnatStyles.keyboardContainer,
        { paddingHorizontal: 0 },
      ]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      {/* vwProfile */}
      <View style={styles.vwProfile}>
        <View style={styles.vwName}>
          <Text style={styles.txtFirstCharacter}>
            {getInitialsTwoDigit(props.fullName)}
          </Text>
          <View style={styles.vwInsta}>
            <Image source={images.imginsta}></Image>
          </View>
        </View>
        <View style={styles.vwNameDate}>
          <Text style={styles.txtFullName}>{props.fullName}</Text>
          <Text style={styles.txtMember}>
            {getTranslation('membersince') + ' ' + props.memberSince}
          </Text>
        </View>
      </View>

      {/* vwFamilyPersonal */}
      <View style={styles.vwAvabilityWorkArea}>
        <TouchableOpacity
          onPress={props.handleNavigateAccount}
          style={styles.vwAvablity}
        >
          <View style={styles.vwInAva}>
            <Image source={images.imgUserProfile}></Image>
          </View>
          <Text style={styles.txtAvability}>{getTranslation('personal')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.vwAvablity}
          onPress={props.handleNavigateAddFamily}
        >
          <View style={styles.vwInAva}>
            <Image source={images.imgFamily}></Image>
          </View>
          <Text style={styles.txtAvability}>{getTranslation('family')}</Text>
        </TouchableOpacity>
      </View>

      {/* vwFavourite */}
      <View style={[styles.vwLatestValue]}>
        <View style={{ marginHorizontal: getWidth(16) }}>
          <Text style={styles.lblLatestValue}>
            {getTranslation('favourite')}
          </Text>
        </View>

        {/* vwFavourites */}
        <View>
          <FlatList
            onEndReached={() => {
              console.log('callend');
            }}
            data={props.recommandAnalysisData}
            renderItem={props.renderRecommandAnlaysisData}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              gap: getWidth(12),
              paddingLeft: getWidth(16),
              paddingRight: getWidth(16),
            }}
          />
        </View>
      </View>

      {/* container */}
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={props.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
        />
      </View>

      {/* vwSupport */}
      <TouchableOpacity style={styles.vwSupport} onPress={() => {}}>
        <Image source={images.imgHelpProfile} />
        <Text style={styles.title}>{getTranslation('supportprofile')}</Text>
      </TouchableOpacity>

      {/* containerTwo */}
      <View style={[styles.containerTwo]}>
        <FlatList
          scrollEnabled={false}
          data={props.dataTwo}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ItemTwo item={item} onPress={() => {}} />}
        />
      </View>

      {/* btns */}
      <View style={{ marginHorizontal: getWidth(16) }}>
        <CustomButton
          style={{ backgroundColor: Colors.redFD, marginTop: getHeight(16) }}
          textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
          btnPress={props.handlePressLogout}
          btnTitle={getTranslation('exit')}
        />

        <CustomButton
          btnImage={images.imgDeleteRed}
          btnicon={true}
          style={{ backgroundColor: Colors.white, marginTop: getHeight(10) }}
          textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
          btnPress={props.handlePressDeleteAccount}
          btnTitle={getTranslation('deleteaccountanddata')}
        />
      </View>

      {/* versionText */}
      <Text
        style={[
          styles.txttitle,
          { marginBottom: props.insets.bottom + getHeight(15) },
        ]}
      >
        {'Versione: v3.4.5 (1111)'}
      </Text>

      {/* swithModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.isShowSwitchModel}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseSwitchModel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={props.funCloseSwitchModel} />

          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '85%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseSwitchModel} // close modal
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    {
                      letterSpacing: 0.2,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('notifications')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

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
          </View>
        </View>
      </Modal>

      {/* orderHistoryModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.isShowOrderHistoryModel}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseOrderHistoryModel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.funCloseOrderHistoryModel}
          />

          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '90%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseOrderHistoryModel} // close modal
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View style={{ marginRight: 14 }}>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    {
                      letterSpacing: 0.2,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('orderhistory')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            <View>
              <FlatList
                onEndReached={() => {
                  console.log('callend');
                }}
                data={props.orderHistoryData}
                renderItem={props.renderItemOrderHistory}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  gap: getWidth(8),
                  marginTop: getHeight(43),
                  paddingBottom: props.insets.bottom + getHeight(80),
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* OrderHistoryDetailsModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.isShowOrderHistoryDetailsModel}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseOrderHistoryDetailsModel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.funCloseOrderHistoryDetailsModel}
          />

          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '90%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseOrderHistoryDetailsModel} // close modal
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View style={{ marginLeft: getWidth(48) }}>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    {
                      letterSpacing: 0.2,
                    },
                  ]}
                  numberOfLines={2}
                >
                  Diabete
                </Text>
                <Text
                  style={[
                    constnatStyles.lblSubHeaderTitle,
                    props?.headerSubTextStyle,
                  ]}
                  numberOfLines={2}
                >
                  #121314
                </Text>
              </View>

              <TouchableOpacity
                style={styles.vwHelp}
                activeOpacity={activityOpacity}
              >
                <Image source={images.imgHelp} />
                <Text style={styles.lblHelp}>{getTranslation('help')}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getHeight(50),
                paddingHorizontal: getWidth(16),
              }}
            >
              <View style={{ marginTop: getHeight(24) }}>
                <Text style={styles.lblYourOrder}>
                  {getTranslation('yourorder')}
                </Text>
                <Text style={styles.lblYourOrderSubtitle}>
                  {getTranslation('pickup')} {'1/8/2025'}
                </Text>
              </View>

              {/* vwkitList */}
              <View>
                <FlatList
                  onEndReached={() => {
                    console.log('callend');
                  }}
                  data={props.testkitsData}
                  renderItem={props.renderItemTestKits}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={{
                    gap: getWidth(8),
                    marginTop: getHeight(24),
                  }}
                />
              </View>

              {/* vwAddress */}
              <ImageBackground
                source={images.imgAddessManager}
                style={styles.vwImgBack}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.lblDateAndTime}>
                      {getTranslation('address')}
                    </Text>
                    <Text style={styles.lblDateAndTimeValue}>
                      Via Roma, 31 - Napoli
                    </Text>
                  </View>
                </View>
              </ImageBackground>

              {/* ✅ Summary Section */}
              <View style={styles.summaryContainer}>
                <View style={{ gap: getHeight(4) }}>
                  <Text style={styles.summaryTitle}>
                    {getTranslation('summarytitle')}
                  </Text>
                  <Text style={styles.summarySubtitle}>
                    {getTranslation('summarysubtitle')}
                  </Text>
                </View>
                <View style={styles.summaryInnerContainer}>
                  {/* Subtotal list */}
                  <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryLabel}>
                      {getTranslation('subtotal')}
                    </Text>
                    <Text style={styles.summaryValue}>{currency} 65.00</Text>
                  </View>
                  <View style={{ marginLeft: getWidth(12), gap: getHeight(8) }}>
                    {props.testkitsData.map((kit: any) => (
                      <View key={kit.id} style={styles.summaryItemRow}>
                        <Text style={styles.summaryLabel}>{kit.name}</Text>
                        <Text style={styles.summaryValue}>
                          {currency} {kit.price.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryLabel}>
                      {getTranslation('service')}
                    </Text>
                    <Text style={styles.summaryValue}>{currency} 20.00</Text>
                  </View>

                  {/* {props.discountValue > 0 && ( */}
                  <View style={styles.summaryItemRow}>
                    <Text style={[styles.summaryLabel]}>
                      {getTranslation('discount')}
                    </Text>
                    <Text
                      style={[styles.summaryValue, { color: Colors.green17 }]}
                    >
                      -{currency} 20.00
                    </Text>
                  </View>
                  {/* )} */}

                  <View style={[styles.summaryItemRow]}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { fontFamily: fontsfamily.bold },
                      ]}
                    >
                      {getTranslation('total')}
                    </Text>
                    <Text
                      style={[
                        styles.summaryValue,
                        { fontFamily: fontsfamily.bold },
                      ]}
                    >
                      {currency} 65.00
                    </Text>
                  </View>
                </View>
              </View>

              {/* bottom button */}
              <View
                style={{
                  marginTop: getHeight(24),
                  marginBottom: props.insets.bottom,
                }}
              >
                <CustomButton
                  btnTitle={getTranslation('downloadreceipt')}
                  style={{ backgroundColor: Colors.grayED }}
                  textStyle={{ color: Colors.gray0F }}
                  // btnPress={props.handleOnPressSaveChanges}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* AddressModel */}
      <AddressModel
        visible={props.addressPopupVisible}
        addresses={props.AddressData}
        selectedId={props?.selectedAddress?.id}
        onSelect={(item: any) => props.setSelectedAddress(item)}
        onAddAddress={() => {
          props.setAddressPopupVisible(false);
          props.navigation.navigate(ScreenNames.ADDADDRESSCONTAINER);
        }}
        onClose={() => props.setAddressPopupVisible(false)}
      />
    </ScrollView>
  );
};

export default ProfileComponent;
