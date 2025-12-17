import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  ImageBackground,
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
  currency,
  getInitialsTwoDigit,
} from '../../constants/GConstant';
import { fontSize } from '../../constants/FontSizes';
import { constnatStyles } from '../../constants/Styles';
import { fontsfamily } from '../../constants/FontFamily';
import AddressModel from '../../global/AddressModel/AddressModel';
import { ScreenNames } from '../../constants/AppConstants';
import AppHeader from '../../global/Header';

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

        {/* vwFavourite */}
        {/* <View style={[styles.vwLatestValue]}>
        <View style={{ marginHorizontal: getWidth(16) }}>
          <Text style={styles.lblLatestValue}>
            {getTranslation('favourite')}
          </Text>
        </View>

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
      </View> */}

        {/* container */}
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={props.data}
            contentContainerStyle={{ gap: getHeight(8) }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
          />
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
          {'Versione: v3.4.5 (1111)'}
        </Text>

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
                    <View
                      style={{ marginLeft: getWidth(12), gap: getHeight(8) }}
                    >
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
    </>
  );
};

export default ProfileComponent;
