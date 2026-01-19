import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { constnatStyles } from '../../constants/Styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { activityOpacity, currency } from '../../constants/GConstant';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { Colors } from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { fontsfamily } from '../../constants/FontFamily';
import CustomDropdown from '../../global/DropDown/CustomDropDown';
import CustomButton from '../../global/Buttons';
import TimeSlotPicker from '../../global/TimeSlotPicker';
import AddressModel from '../../global/AddressModel/AddressModel';
import { isPlatformiOS, ScreenNames } from '../../constants/AppConstants';
import TitleSubtitle from '../../global/TitleSubtitle';
import { fontSize } from '../../constants/FontSizes';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from '@react-native-community/blur';
import PressScale from '../../global/PressScale';
import { GlobalVar } from '../../constants/GlobalVar';

const CheckoutComponent = (props: any) => {
  const [isFocused, setIsFocused] = useState(false); // Add focus state

  // 🔥 Moved styles here (no global style)
  const customStylesTextInput :any = {
    container: {
      flex: 1,
      borderRadius: 12,
    },
    input: {
      textAlignVertical: 'top', // Aligns the text to the top for multiline
      height: '100%',
      overflow: 'hidden',
      // height: getHeight(56),
      borderWidth: 2,
      borderRadius: 12,
      fontSize: fontSize.size16,
      fontFamily: fontsfamily.gregular,
      borderColor: isFocused ? Colors.blue002 : Colors.grayD8, // Dynamic border color
      color: Colors.black,
    },
    inputFocused: {
      borderColor: Colors.blue1C,
    },
    suggestionsContainer: {
      backgroundColor: '#ffffff',
      maxHeight: 200,
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
    },
    suggestionItem: {
      padding: 15,
    },
  };
  return (
    <>
      <View style={{}}>
        <View
          style={[
            styles.vwMain,
            {
              paddingTop:
                props.orderStatus == '' ? props.insets.top + 10 : getHeight(25),
              paddingHorizontal: getWidth(16),
            },
          ]}
        >
          <View style={styles.vwHeaderLeft}>
            <TouchableOpacity
              activeOpacity={activityOpacity}
              style={styles.btnBack}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Image source={images.imgLeftArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.vwHelp}
              activeOpacity={activityOpacity}
            >
              <Image source={images.imgHelp} />
              <Text style={styles.lblHelp}>{getTranslation('help')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {props.testkitsData.length === 0 ? (
        <View style={styles.emptyview}>
          <Image
            source={images.imgMicroscope}
            style={{ alignSelf: 'center' }}
          />
          <Text style={styles.orderhistoryemptytitle} numberOfLines={1}>
            {getTranslation('checkoutemptytitle')}
          </Text>
          <Text style={styles.orderhistoryemptysubtitle} numberOfLines={3}>
            {getTranslation('checkoutemptysubtitle')}
          </Text>
          <CustomButton
            btnTitle={getTranslation('checkoutemptybtn')}
            style={{ backgroundColor: Colors.blueD1 }}
            btnicon={false}
            textStyle={{ color: Colors.blue002 }}
            btnPress={props.funGetTestedContainer}
          />
        </View>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[
            constnatStyles.keyboardContainer,
            {
              // paddingBottom: getHeight(200),
            },
          ]}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* vwHeaderTitle */}
          <View style={{ marginTop: getHeight(24) }}>
            <Text style={styles.lblYourOrder}>
              {getTranslation('yourorder')}
            </Text>
            <Text style={styles.lblYourOrderSubtitle}>
              {getTranslation('yourordersubtitle')}
            </Text>
          </View>

          {/* dropdownfamilymember */}
          <View style={{ marginTop: getHeight(24) }}>
            <Text style={styles.lblwhodothetest}>
              {getTranslation('whoshoulddotest')}
            </Text>
            <View style={{ marginTop: getHeight(6) }}>
              <CustomDropdown
                data={props.familyMemberData}
                value={props.familymemberValue}
                onChange={item => props.handleSetFamilyMember(item)}
                placeholder={getTranslation('selectfamilymember') || ''}
                dropdownPosition="auto"
                isRenderLeftIcon={false}
              />
            </View>
          </View>

          {/* vwkitList */}
          <View>
            <FlatList
              onEndReached={() => {
                // console.log('callend');
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
            <PressScale onPress={props.funOpenIsModifyOrder}>
              <View style={styles.btnEdit}>
                <Image source={images.addblue} tintColor={Colors.white} />
                <Text style={styles.lblEdit}>
                  {getTranslation('addanalysis')}
                </Text>
              </View>
            </PressScale>
          </View>

          {/* vwDateTime */}
          <View style={{ marginTop: getHeight(24) }}>
            <Text style={styles.lblHomeService}>
              {getTranslation('homesevice')}
            </Text>
            <View style={styles.vwDateTimeMain}>
              <View style={styles.vwDateTimeInner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lblDateAndTime}>
                    {getTranslation('dateandtime')}
                  </Text>
                  <Text style={styles.lblDateAndTimeValue}>
                    {props.selectedSlot
                      ? `${props.selectedSlot.day} ${props.selectedSlot.time}`
                      : 'Domani entro le 10:00'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btnAdd}
                  activeOpacity={activityOpacity}
                  onPress={() => props.setShowPicker(true)} // 👈 open picker modal
                >
                  <Text style={styles.lblChnage}>
                    {' '}
                    {getTranslation('change')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
                  {props.selectedAddress
                    ? `${props.selectedAddress.title} - ${props.selectedAddress.subtitle}`
                    : 'Via Roma, 31 - Napoli'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnChange}
                activeOpacity={activityOpacity}
                onPress={props.handleNavigateAddAddress}
              >
                <Text style={styles.lblChnage}>{getTranslation('change')}</Text>
              </TouchableOpacity>
            </View>

            {/* vwAddtionalInstructions */}
            <View style={{ marginTop: getHeight(16) }}>
              <Text style={styles.lblAddtionalInstructions}>
                {getTranslation('additionalinstructions')}
              </Text>
              <View>
                <TextInput
                  style={styles.vwInput}
                  placeholder={getTranslation('manageaddressplaceholder') || ''}
                  placeholderTextColor={Colors.gray75}
                  cursorColor={Colors.gray75}
                  selectionColor={Colors.gray75}
                  value={props.manageAddress}
                  onChangeText={props.onChnageManageAddress}
                />
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
                <Text style={styles.summaryValue}>
                  {currency} {props.subtotal.toFixed(2)}
                </Text>
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
                <Text style={styles.summaryValue}>
                  {currency} {props.homeServiceCharge.toFixed(2)}
                </Text>
              </View>

              {/* {props.discountValue > 0 && ( */}
              <View style={styles.summaryItemRow}>
                <Text style={[styles.summaryLabel]}>
                  {getTranslation('discount')}
                </Text>
                <Text style={[styles.summaryValue, { color: Colors.green17 }]}>
                  -{currency} {props.discountValue.toFixed(2)}
                </Text>
              </View>
              {/* // )} */}

              <View style={[styles.summaryItemRow]}>
                <Text
                  style={[
                    styles.summaryLabel,
                    { fontFamily: fontsfamily.gbold },
                  ]}
                >
                  {getTranslation('total')}
                </Text>
                <Text
                  style={[
                    styles.summaryValue,
                    { fontFamily: fontsfamily.gbold },
                  ]}
                >
                  {currency} {props.total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* discountCode */}
          <View style={{ marginTop: getHeight(16) }}>
            <Text style={styles.lblHaveYouCoupans}>
              {getTranslation('haveyoucoupans')}
            </Text>
            <View style={styles.vwInputDisocunt}>
              <TextInput
                style={styles.vwInputDiscountInner}
                placeholder={getTranslation('placholdercoupans') || ''}
                placeholderTextColor={Colors.gray75}
                cursorColor={Colors.gray75}
                selectionColor={Colors.gray75}
                value={props.discountCode}
                onChangeText={props.onChangeDiscountCode}
              />
              <TouchableOpacity
                style={[styles.btnChange, { backgroundColor: Colors.blueD1 }]}
                activeOpacity={activityOpacity}
                onPress={props.onApplyDiscount}
              >
                <Text style={styles.lblChnage}>{getTranslation('add')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* bottom button */}
          <View
            style={[
              styles.vwBottomBtn,
              {
                marginBottom:
                   props.insets.bottom + getHeight(10),
              },
            ]}
          >
            <CustomButton
              btnTitle={getTranslation('savechnages')}
              btnPress={props.handleOnPressSaveChanges}
            />
            <CustomButton
              btnTitle={getTranslation('canclereservation')}
              style={{ backgroundColor: Colors.redFD }}
              btnicon={true}
              btnImage={images.imgDelete}
              textStyle={{ color: Colors.red8C }}
              btnPress={props.funOpenCancleOrder}
            />
          </View>
        </KeyboardAwareScrollView>
      )}

      {/* datetimeslotmodel */}
      <Modal
        statusBarTranslucent
        isVisible={props.showPicker}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => props.setShowPicker(false)}
        onBackButtonPress={() => props.setShowPicker(false)}
        style={{ margin: 0 }} // important: full screen
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '60%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={styles.vwMainModelHeader}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => props.setShowPicker(false)}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    { letterSpacing: 0.2 },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('bookanlaysis')}
                </Text>
              </View>

              {/* Spacer for alignment */}
              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            <TimeSlotPicker
              selectedDate={props.selectedDate}
              selectedTime={props.selectedTime}
              onDateChange={props.setSelectedDate}
              onTimeChange={props.setSelectedTime}
              showPicker={props.showPicker}
            />

            <View
              style={{
                marginTop: getHeight(32),
                marginHorizontal: getWidth(16),
                marginBottom: props.insets.bottom + getHeight(16),
              }}
            >
              <CustomButton
                btnTitle={getTranslation('confirmdata')}
                btnPress={props.onBookSlot}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* editmodifyordermodel */}
      <Modal
        statusBarTranslucent
        useNativeDriverForBackdrop={true}
        isVisible={props.showIsModifyOrder}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        onBackdropPress={props.funCloseIsModifyOrder}
        onBackButtonPress={props.funCloseIsModifyOrder}
        style={{ margin: 0 }} // important for full-screen bottom modal
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '92%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={styles.vwMainModelHeader}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseIsModifyOrder}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    { letterSpacing: 0.2 },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('modifyorder')}
                </Text>
              </View>

              {/* Spacer */}
              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            {/* Tabs */}
            <View style={styles.vwCheckupAnaliti}>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                onPress={() => props.setSelectedTab('checkup')}
                style={[
                  styles.btncheckup,
                  {
                    backgroundColor:
                      props.selectedTab === 'checkup'
                        ? Colors.blue002
                        : Colors.grayE7,
                  },
                ]}
              >
                <Image
                  source={images.imgCartHome}
                  style={{
                    resizeMode: 'contain',
                    tintColor:
                      props.selectedTab === 'checkup'
                        ? Colors.white
                        : Colors.blue002,
                  }}
                />
                <Text
                  style={[
                    styles.lblCheckup,
                    {
                      fontFamily: fontsfamily.gmedium,
                      color:
                        props.selectedTab === 'checkup'
                          ? Colors.white
                          : Colors.blue002,
                    },
                  ]}
                >
                  {getTranslation('checkuptext')} ({props.checkupcount})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={activityOpacity}
                onPress={() => props.setSelectedTab('analiti')}
                style={[
                  styles.btnAnlaiti,
                  {
                    backgroundColor:
                      props.selectedTab === 'analiti'
                        ? Colors.blue002
                        : Colors.grayE7,
                  },
                ]}
              >
                <Image
                  source={images.imgCartHome}
                  style={{
                    resizeMode: 'contain',
                    tintColor:
                      props.selectedTab === 'analiti'
                        ? Colors.white
                        : Colors.blue002,
                  }}
                />
                <Text
                  style={[
                    styles.lblAnaliti,
                    {
                      fontFamily: fontsfamily.gmedium,
                      color:
                        props.selectedTab === 'analiti'
                          ? Colors.white
                          : Colors.blue002,
                    },
                  ]}
                >
                  {getTranslation('analitiheadertext')} ({props.checkupcount})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            {props.selectedTab === 'checkup' ? (
              <FlatList
                key="checkup-2"
                numColumns={2}
                data={props.kitData}
                renderItem={props.renderKitData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  gap: getWidth(12),
                  marginTop: getHeight(20),
                  alignSelf: 'center',
                  paddingBottom: getHeight(150),
                }}
              />
            ) : (
              <FlatList
                key="analiti-1"
                numColumns={1}
                data={props.analitiData}
                renderItem={props.renderAnalitiData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  gap: getWidth(12),
                  marginTop: getHeight(20),
                  paddingBottom: getHeight(150),
                }}
              />
            )}

            {/* 🔹 BLUR BEHIND GO TO CART */}
            <MaskedView
              pointerEvents="none"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 110,
              }}
              maskElement={
                <LinearGradient
                  colors={[
                    'transparent', // ❌ no blur at top
                    'black', // ✅ full blur at bottom
                  ]}
                  locations={[0.25, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              <BlurView
                style={{ flex: 1 }}
                blurType="light"
                blurAmount={14}
                reducedTransparencyFallbackColor="transparent"
              />
            </MaskedView>

            {/* Go To Cart */}
            <PressScale onPress={props.funCloseIsModifyOrder}>
              <View
                style={[
                  styles.vwGoToCart,
                  {
                    bottom:
                       getHeight(30),
                  },
                ]}
              >
                <View style={styles.vwCartImage}>
                  <Image source={images.imgCartHome} tintColor={Colors.white} />
                  <Text style={styles.lblGoToCart}>
                    {getTranslation('gotocart')}
                  </Text>
                </View>

                <View style={styles.vwPrice}>
                  <Text style={styles.totalprice}>
                    {currency}
                    {props.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </PressScale>
          </View>
        </View>
      </Modal>

      {/* editkitTestDetails */}
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={props.showIsKitTestDetails}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseEditKit}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={props.funCloseEditKit} />

          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(34),
              borderTopRightRadius: getHeight(34),
              maxHeight: '85%',
              overflow: 'hidden',
            }}
          >
          
            <ImageBackground
              source={images.imgkit1}
              style={[styles.vwMainModelHeaderTestDetails]}
            >
              <View
                style={{ paddingHorizontal: getWidth(16), gap: getHeight(3) }}
              >
                <TouchableOpacity
                  style={styles.btnBack}
                  onPress={props.funCloseEditKit} // close modal
                >
                  <Image source={images.imgLeftArrow} />
                </TouchableOpacity>
                <View style={{ marginBottom: getHeight(40) }}>
                  <Text style={styles.lblKittitleModel}>Anemia</Text>
                  <Text style={styles.lblKitselectTitle}>
                    1 {getTranslation('selected')}
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <View
              style={{
                backgroundColor: Colors.whiteF2,
                borderTopLeftRadius: 36,
                borderTopRightRadius: 36,
                overflow: 'hidden',
                marginTop: -35,
              }}
            >
              <Text style={styles.lblKitTitleInner}>
                {getTranslation('analitiheadertext')}
              </Text>
              <FlatList
                onEndReached={() => {
                  // console.log('callend');
                }}
                bounces={false}
                data={props.kitsArrayData}
                renderItem={props.renderItemKitsData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  gap: getHeight(20),
                  paddingHorizontal: getWidth(16),
                  paddingTop: getHeight(25),
                  paddingBottom: getHeight(320),
                }}
              />
            </View>
           
            <TouchableOpacity
              style={[
                styles.vwGoToCart,
                {
                  bottom:
                     props.insets.bottom + getHeight(10),
                },
              ]}
              activeOpacity={activityOpacity}
              onPress={props.funCloseIsKitTestDetails}
            >
              <View style={styles.vwCartImage}>
                <Image source={images.imgCartHome} tintColor={Colors.white} />
                <Text style={styles.lblGoToCart}>
                  {getTranslation('addtoorder')}
                </Text>
              </View>
              <View style={styles.vwPrice}>
                <Text style={styles.totalprice}>
                  {currency}
                  {props.totalPriceKits.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      {/* editAnalitidetails */}
      <Modal
        statusBarTranslucent
        useNativeDriverForBackdrop={true}
        isVisible={props.editAnlitiPopupVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        onBackdropPress={props.funCloseEditAnaliti}
        onBackButtonPress={props.funCloseEditAnaliti}
        style={{ margin: 0 }} // full screen
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '92%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={styles.vwMainModelHeaderEditAnliti}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseEditAnaliti}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>
            </View>

            {/* Kit Details */}
            <View style={styles.imgkitdetails}>
              <View style={styles.vwHeaderTitle}>
                <Image
                  source={images.imgHeart}
                  style={{ height: getHeight(64), aspectRatio: 1 }}
                />
                <Text style={styles.kittitle}>Cuore e circolazione</Text>
                <Text style={styles.kitsubtitle}>
                  9 {getTranslation('analititextdetails')}
                </Text>
              </View>
            </View>

            {/* Test List */}
            <FlatList
              data={props.analitiArrayData}
              renderItem={props.renderitemanalitidata}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                marginTop: getHeight(31),
                gap: getHeight(20),
                paddingHorizontal: getWidth(16),
                paddingBottom: getHeight(100),
              }}
            />

            {/* 🔹 BLUR BEHIND GO TO CART */}
            <MaskedView
              pointerEvents="none"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 110,
              }}
              maskElement={
                <LinearGradient
                  colors={[
                    'transparent', // ❌ no blur at top
                    'black', // ✅ full blur at bottom
                  ]}
                  locations={[0.25, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              <BlurView
                style={{ flex: 1 }}
                blurType="light"
                blurAmount={14}
                reducedTransparencyFallbackColor="transparent"
              />
            </MaskedView>

            {/* Add To Order */}
            <PressScale onPress={props.funCloseEditAnaliti}>
              <View
                style={[
                  styles.vwGoToCart,
                  {
                    bottom:
                       getHeight(30),
                  },
                ]}
              >
                <View style={styles.vwCartImage}>
                  <Image source={images.imgCartHome} tintColor={Colors.white} />
                  <Text style={styles.lblGoToCart}>
                    {getTranslation('addtoorder')}
                  </Text>
                </View>

                <View style={styles.vwPrice}>
                  <Text style={styles.totalprice}>
                    {currency}
                    {props.totalPriceAnaliti.toFixed(2)}
                  </Text>
                </View>
              </View>
            </PressScale>
          </View>
        </View>
      </Modal>

      {/* AddressModel */}
      <AddressModel
        visible={props.addressPopupVisible}
        addresses={props.AddressData}
        selectedId={props?.selectedid}
        onSelect={props.handleOnPressSetId}
        onAddAddress={props.handlePressAddAddress}
        onClose={props.handleCloseAddress}
        onSave={props.handleOnPressSaveLocation}
      />

      {/* AddAddressModel */}
      <Modal
        statusBarTranslucent
        useNativeDriverForBackdrop={true}
        isVisible={props.addAddressPopupVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        onBackdropPress={props.funCloseAddAddressPopup}
        onBackButtonPress={props.funCloseAddAddressPopup}
        style={{ margin: 0 }}
        avoidKeyboard
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '80%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={styles.vwMainModelHeader}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseAddAddressPopup}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>

              <View>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    { letterSpacing: 0.2 },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('addaddresspopupbtn')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            {/* Title */}
            <View style={styles.vwMainAddAddress}>
              <Text style={styles.lblAddAddressPopupTitle}>
                {getTranslation('addaddresspopuptitle')}
              </Text>
            </View>

            {/* Form */}
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              bounces
              contentContainerStyle={[
                constnatStyles.keyboardContainer,
                { paddingBottom: getHeight(17) },
              ]}
              style={{ backgroundColor: Colors.whiteF2 }}
            >
              <View
                style={{
                  marginTop: getHeight(27),
                  flex: 1,
                  gap: getHeight(12),
                }}
              >
                {/* Address Type */}
                <View>
                  <Text style={styles.lblwhodothetest}>
                    {getTranslation('typology')}
                  </Text>

                  <View style={{ marginTop: getHeight(6) }}>
                    <CustomDropdown
                      data={props.addressTypeData}
                      value={props.addressTypeValue}
                      onChange={item => {
                        props.setAddressTypeError('');
                        props.handleSetAddressType(item);
                      }}
                      placeholder={
                        getTranslation('selectaddressplaceholder') || ''
                      }
                      dropdownPosition="auto"
                      isRenderLeftIcon={false}
                      dropdownstyle={{
                        borderColor: props.addressTypeError
                          ? Colors.red8C
                          : Colors.grayD8,
                        backgroundColor: props.addressTypeError
                          ? Colors.redFD
                          : Colors.white,
                      }}
                    />

                    {props.addressTypeError ? (
                      <View style={styles.vwError}>
                        <Image source={images.imgWarning} />
                        <Text style={styles.lablWarning}>
                          {props.addressTypeError}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* Search Address */}
                <View>
                  <Text style={styles.lblTitleInput}>
                    {getTranslation('searchaddress')}
                  </Text>

                  <GooglePlacesTextInput
                    ref={props.searchRef}
                    apiKey={
                      isPlatformiOS
                        ? GlobalVar.google_map_api_key_ios
                        : GlobalVar.google_map_api_key_android
                    }
                    placeHolderText={
                      getTranslation('addaddressplacholder') || ''
                    }
                    onPlaceSelect={(place: any) => {
                      props.handlePlaceSelect(place);
                      props.setSearchAddress(place?.text?.text || ''); // Store selected address
                    }}
                    onChangeText={props.setSearchAddress}
                    cursorColor={Colors.blue002}
                    selectionColor={Colors.blue002}
                    languageCode="en"
                    style={customStylesTextInput}
                    showClearButton={false}
                    showLoadingIndicator={false}
                  />
                </View>

                {/* Floor & Stairs */}
                <View style={styles.vwInputsInner}>
                  <PrimaryTitleTextInput
                    flex={1}
                    placHolderLabel={getTranslation('florrplaceholder')}
                    refs={props.floorRef}
                    focusnext={() => props.stairsRef.current?.focus()}
                    inputLabel={getTranslation('florr')}
                    value={props.floor}
                    onChangeFun={(text:any) =>
                      props.handleOnChangeText(text, 'floor')
                    }
                    errorMessage={props.floorError}
                    setErrorMessage={props.setFloorError}
                    isBorder={false}
                    isflexstart={true}
                  />

                  <PrimaryTitleTextInput
                    flex={1}
                    placHolderLabel={getTranslation('stairsplaceholder')}
                    refs={props.stairsRef}
                    focusnext={() => props.instructionRef.current?.focus()}
                    inputLabel={getTranslation('stairs')}
                    value={props.stairs}
                    onChangeFun={(text:any) =>
                      props.handleOnChangeText(text, 'stairs')
                    }
                    errorMessage={props.stairsError}
                    setErrorMessage={props.setStairsError}
                    isBorder={false}
                    isflexstart={true}
                  />
                </View>

                {/* Instructions */}
                <PrimaryTitleTextInput
                  placHolderLabel={getTranslation('instructionplaceholder')}
                  refs={props.instructionRef}
                  inputLabel={getTranslation('instruction')}
                  value={props.instructions}
                  onChangeFun={(text:any) =>
                    props.handleOnChangeText(text, 'instruction')
                  }
                  errorMessage={props.instructionsError}
                  setErrorMessage={props.setInstructionNameError}
                  isBorder={false}
                />

                {/* Default Address */}
                <View style={styles.vwSwitchcontainer}>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    onPress={props.toggleisDefault}
                  >
                    <Image
                      source={
                        props.isdefaultsave
                          ? images.imgSelectRadio
                          : images.imgUnselectRadio
                      }
                    />
                  </TouchableOpacity>

                  <Text style={styles.lblSwitchTitle}>
                    {getTranslation('addfavouriteaddresslabel')}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>

            {/* Actions */}
            <View
              style={{
                marginBottom:
                 props.insets.bottom + getHeight(16),
                marginHorizontal: getWidth(16),
              }}
            >
              <CustomButton
                btnPress={props.handleOnPressSaveAddress}
                btnTitle={getTranslation('saveaddress')}
              />

              <CustomButton
                btnicon={false}
                style={{
                  backgroundColor: Colors.blueD1,
                  marginTop: getHeight(8),
                }}
                textStyle={{ color: Colors.blue002 }}
                btnPress={props.funCloseAddAddressPopup}
                btnTitle={getTranslation('cancleaddress')}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* CancleModel */}
      <Modal
        statusBarTranslucent
        useNativeDriverForBackdrop={true}
        isVisible={props.cancleOrderVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        onBackdropPress={props.funCloseCancleOrder}
        onBackButtonPress={props.funCloseCancleOrder}
        style={{ margin: 0 }} // full screen
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: Colors.whiteF2,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '80%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />

            <View style={styles.vwMainModelHeader}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseCancleOrder}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: getWidth(16),
                marginTop: getHeight(24),
              }}
            >
              <TitleSubtitle
                title={getTranslation('cancleordertitle')}
                subtitle={getTranslation('cancleordersubtitle')}
              />

              <View
                style={{
                  marginTop: getHeight(123),
                  marginBottom:
                    props.insets.bottom + getHeight(10),
                }}
              >
                <CustomButton
                  btnTitle={getTranslation('cancletext')}
                  btnPress={props.handleNavigateHome}
                  style={{ backgroundColor: Colors.redFC }}
                  textStyle={{ color: Colors.red8C }}
                />

                <CustomButton
                  btnTitle={getTranslation('cancletextnoback')}
                  style={{
                    backgroundColor: Colors.blueD1,
                    marginTop: getHeight(8),
                  }}
                  textStyle={{ color: Colors.gray0F }}
                  btnPress={props.funCloseCancleOrder}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CheckoutComponent;
