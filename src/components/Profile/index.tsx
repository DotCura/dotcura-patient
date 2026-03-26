import {
  Image,
  Switch,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import {
  activityOpacity,
  getInitialsTwoDigit,
} from '../../constants/GConstant';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { constnatStyles } from '../../constants/Styles';
import { ScreenNames } from '../../constants/AppConstants';
import AppHeader from '../../global/Header';
import DeviceInfo from 'react-native-device-info';

const ProfileComponent = (props: any) => {
  const Item = ({ item, onPress }: any) => (
    <TouchableOpacity style={styles.itemContainer} onPress={item.onpressfun}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={item.image}
          style={{ alignSelf: 'center', marginTop: 1 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {item.iscurv == true && (
        <Image source={images.imgRightCurve} style={{ alignSelf: 'center' }} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          // navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
          //   screen: ScreenNames.HOMECONTAINER,
          // });
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={false}
        showSubTitle={false}
        showEndBtn={true}
        isNotificationIcon={true}
        NotificationPressFun={() => {
          props.navigation.navigate(ScreenNames.NOTIFICATIONLISTCONTAINER);
        }}
      />
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          { paddingHorizontal: 0 },
        ]}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
      >
        {/* vwProfile */}
        <View style={styles.vwProfile}>
          <View style={styles.vwName}>
            <Text style={styles.txtFirstCharacter}>
              {getInitialsTwoDigit(props.fullName)}
            </Text>
            {/* <View style={styles.vwInsta}>
            <Image source={images.imginsta}></Image>
          </View> */}
          </View>
          <View style={styles.vwNameDate}>
            <Text style={styles.txtFullName}>{props.fullName}</Text>
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <Text style={styles.txtMember}>+{props.countrycode}</Text>
              <Text style={styles.txtMember}>{props.phoneNumber}</Text>
            </View>
            <Text style={styles.txtMember}>
              {getTranslation('membersince') + ' ' + props.memberSince}
            </Text>
          </View>
        </View>

        {/* vwFamilyPersonal */}
        <View style={styles.vwAvabilityWorkArea}>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            onPress={props.handleNavigateAccount}
            style={styles.vwAvablity}
          >
            <View style={styles.vwInAva}>
              <Image source={images.imgUserProfile}></Image>
            </View>
            <Text style={styles.txtAvability}>
              {getTranslation('personal')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={styles.vwAvablity}
            onPress={props.handleNavigateAddFamily}
          >
            <View style={styles.vwInAva}>
              <Image source={images.imgFamily}></Image>
            </View>
            <Text style={styles.txtAvability}>{getTranslation('family')}</Text>
          </TouchableOpacity>
        </View>

        {/* container */}
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={props.data}
            contentContainerStyle={{ gap: getHeight(8) }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
          />
          {/* Biometric Toggle Row */}
          <View style={styles.itemContainer}>
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
              <Image
                source={images.imgWarningProfile}
                style={{ alignSelf: 'center', marginTop: 1 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                  {getTranslation('accessbiomatric')}
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.size13,
                    fontFamily: fontsfamily.gregular,
                    color: Colors.gray75,
                    marginLeft: getWidth(5),
                    marginTop: 2,
                  }}
                >
                  {getTranslation('faceidunlockwithfaceid')}
                </Text>
              </View>
            </View>
            <Switch
              value={props.biometricEnabled}
              onValueChange={props.onToggleBiometric}
              trackColor={{ false: Colors.grayD8, true: Colors.blue002 }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={props.dataThree}
            contentContainerStyle={{ gap: getHeight(8) }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
          />
        </View>

        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={props.dataTwo}
            contentContainerStyle={{ gap: getHeight(8) }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
          />
        </View>

        {/* btns */}
        <View style={{ marginHorizontal: getWidth(16) }}>
          <CustomButton
            style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(16) }}
            textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
            btnPress={props.handlePressLogout}
            btnTitle={getTranslation('exit')}
          />

          <CustomButton
            btnImage={images.imgDeleteRed}
            btnicon={true}
            style={{ backgroundColor: Colors.redFC, marginTop: getHeight(10) }}
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
          {getTranslation('versionname')}: v{DeviceInfo.getVersion()}
          {' (' + DeviceInfo.getBuildNumber() + ')'}
        </Text>
      </ScrollView>
    </>
  );
};

export default ProfileComponent;
