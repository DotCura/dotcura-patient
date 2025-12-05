import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
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
import { ScreenNames } from '../../constants/AppConstants';
import TitleSubtitle from '../../global/TitleSubtitle';
import { fontSize } from '../../constants/FontSizes';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';

const CheckoutComponent = (props: any) => {
  const [isFocused, setIsFocused] = useState(false); // Add focus state

  // 🔥 Moved styles here (no global style)
  const customStylesTextInput = {
    container: {
      flex: 1,
      borderRadius: 12,
    },
    input: {
      overflow: 'hidden',
      height: getHeight(56),
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
      maxHeight: 250,
      position: 'absolute',
      top: 50,
      left: -35,
      right: 0,
      width: '120%',
      zIndex: 1000,
    },
    suggestionItem: {
      padding: 15,
    },
  };
  return (
    <>
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
          <Text style={styles.lblYourOrder}>{getTranslation('yourorder')}</Text>
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
          <TouchableOpacity
            style={styles.btnEdit}
            activeOpacity={activityOpacity}
            onPress={props.funOpenIsModifyOrder}
          >
            <Image source={images.addblue} tintColor={Colors.white} />
            <Text style={styles.lblEdit}>{getTranslation('addanalysis')}</Text>
          </TouchableOpacity>
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
                style={[styles.summaryLabel, { fontFamily: fontsfamily.gbold }]}
              >
                {getTranslation('total')}
              </Text>
              <Text
                style={[styles.summaryValue, { fontFamily: fontsfamily.gbold }]}
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
                props.insets.bottom > 0
                  ? props.insets.bottom
                  : props.insets.bottom + getHeight(16),
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

      {/* datetimeslotmodel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.showPicker}
        statusBarTranslucent={true}
        onRequestClose={() => props.setShowPicker(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => props.setShowPicker(false)}
          />

          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '60%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />
            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                // onPress={props.startBtnOnPress}
                onPress={() => props.setShowPicker(false)} // close modal
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
                  {getTranslation('bookanlaysis')}
                </Text>
              </View>

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
                btnTitle={getTranslation('booktext')}
                btnPress={props.onBookSlot}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* editmodifyordermodel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.showIsModifyOrder}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseIsModifyOrder}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.funCloseIsModifyOrder}
          />

          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: getHeight(20),
              borderTopRightRadius: getHeight(20),
              maxHeight: '92%',
            }}
          >
            {/* Header */}
            <View style={styles.vwHeadingLine} />
            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseIsModifyOrder} // close modal
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
                  {getTranslation('modifyorder')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            {/* vwinthecart */}
            <View style={{ marginTop: getHeight(30) }}>
              <Text style={styles.lblInTheCart}>
                {getTranslation('inthecart')}
              </Text>
              <FlatList
                onEndReached={() => {
                  // console.log('callend');
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={props.kitDataInCart}
                renderItem={props.renderKitDataInCart}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  marginLeft: getWidth(16),
                  marginRight: getWidth(16),
                  alignSelf: 'center',
                }}
              />
            </View>
            {/* vwAddMore */}
            <View style={{ marginTop: getHeight(42) }}>
              <Text style={styles.lblInTheCart}>
                {getTranslation('addmoretext')}
              </Text>
              <View>
                <FlatList
                  onEndReached={() => {
                    // console.log('callend');
                  }}
                  numColumns={2}
                  data={props.kitDataAddMore}
                  renderItem={props.renderKitDataAddMore}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  columnWrapperStyle={{
                    gap: getWidth(12),
                  }}
                  contentContainerStyle={{
                    gap: getWidth(12),
                    alignSelf: 'center',
                    paddingBottom: 550,
                  }}
                />
              </View>
            </View>

            {/* vwGotoCart */}
            <TouchableOpacity
              style={[
                styles.vwGoToCart,
                {
                  bottom:
                    props.insets.bottom > 0
                      ? props.insets.bottom
                      : props.insets.bottom + getHeight(16),
                },
              ]}
              activeOpacity={activityOpacity}
              onPress={props.funCloseIsModifyOrder}
            >
              <View style={styles.vwCartImage}>
                <Image source={images.imgCartHome} tintColor={Colors.white} />
                <Text style={styles.lblGoToCart}>
                  {getTranslation('gotocart')}
                </Text>
              </View>
              <View style={styles.vwPrice}>
                {/* {props.selectedTests.length === props.kitsArrayData.length && (
            <Text style={styles.disprice}>{currency}0.54</Text>
          )} */}
                <Text style={styles.totalprice}>
                  {currency}
                  {props.total.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* editkitTestDetails */}
      <Modal
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
            {/* Header */}
            <ImageBackground
              source={images.imgkit1}
              style={[styles.vwMainModelHeader]}
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
              <Text style={styles.lblKitTitleInner}>{getTranslation("analitiheadertext")}</Text>
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
                  paddingBottom:getHeight(320)
                }}
              />
            </View>
            {/* vwGotoCart */}
            <TouchableOpacity
              style={[
                styles.vwGoToCart,
                {
                  bottom:
                    props.insets.bottom > 0
                      ? props.insets.bottom
                      : props.insets.bottom + getHeight(16),
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
                  {props.totalPrice.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
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
        onSave={props.handleOnPressSaveLocation} // use when hitting Save button
      />
      {/* AddAddressModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.addAddressPopupVisible}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseAddAddressPopup}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.funCloseAddAddressPopup}
          />

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
            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseIsKitTestDetails} // close modal
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
                  {getTranslation('addaddresspopupbtn')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>

            <View style={styles.vwMainAddAddress}>
              <Text style={styles.lblAddAddressPopupTitle}>
                {getTranslation('addaddresspopuptitle')}
              </Text>
            </View>

            <KeyboardAwareScrollView
              scrollEnabled
              showsVerticalScrollIndicator={false}
              bounces={true}
              contentContainerStyle={[
                constnatStyles.keyboardContainer,
                {
                  paddingBottom: getHeight(17),
                },
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
                {/* dropdownfamilymember */}
                <View>
                  <Text style={styles.lblwhodothetest}>
                    {getTranslation('typology')}
                  </Text>
                  <View style={{ marginTop: getHeight(6) }}>
                    <CustomDropdown
                      data={props.addressTypeData}
                      value={props.addressTypeValue}
                      onChange={item => {
                        props.setAddressTypeError(''); // clear error on selection
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
                <View>
                  <Text style={styles.lblTitleInput} numberOfLines={1}>
                    {getTranslation('searchaddress')}
                  </Text>
                  <View style={{ marginTop: 1 }}>
                    <GooglePlacesTextInput
                      ref={props.searchRef}
                      apiKey={''}
                      placeHolderText={
                        getTranslation('addaddressplacholder') || ''
                      }
                      onPlaceSelect={(place: any) => {
                        props.handlePlaceSelect(place);
                        props.setSearchAddress(place?.fullText || ''); // Store selected address
                      }}
                      onChangeText={(text: any) => {
                        props.setSearchAddress(text); // store every typed change
                      }}
                      cursorColor={Colors.blue002}
                      selectionColor={Colors.blue002}
                      languageCode="en"
                      style={customStylesTextInput}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      showClearButton={false}
                      showLoadingIndicator={false}
                    />
                  </View>
                </View>
                <View style={styles.vwInputsInner}>
                  <PrimaryTitleTextInput
                    flex={1}
                    placHolderLabel={getTranslation('florrplaceholder')}
                    refs={props.floorRef}
                    focusnext={() => props.stairsRef.current?.focus()}
                    inputLabel={getTranslation('florr')}
                    blur={false}
                    leftIcon={false}
                    keyaboardType={'default'}
                    value={props.floor}
                    onChangeFun={(text: any) =>
                      props.handleOnChangeText(text, 'floor')
                    }
                    errorMessage={props.floorError}
                    setErrorMessage={props.setFloorError}
                    isMultiline={false}
                    isBorder={false}
                    isflexstart={true}
                  />
                  <PrimaryTitleTextInput
                    flex={1}
                    placHolderLabel={getTranslation('stairsplaceholder')}
                    inputLabel={getTranslation('stairs')}
                    refs={props.stairsRef}
                    focusnext={() => props.instructionRef.current?.focus()}
                    blur={false}
                    leftIcon={false}
                    keyaboardType={'default'}
                    value={props.stairs}
                    onChangeFun={(text: any) =>
                      props.handleOnChangeText(text, 'stairs')
                    }
                    errorMessage={props.stairsError}
                    setErrorMessage={props.setStairsError}
                    isflexstart={true}
                    isMultiline={false}
                    isBorder={false}
                  />
                </View>

                <View>
                  <PrimaryTitleTextInput
                    placHolderLabel={getTranslation('instructionplaceholder')}
                    refs={props.instructionRef}
                    inputLabel={getTranslation('instruction')}
                    blur={true}
                    leftIcon={false}
                    keyaboardType={'default'}
                    value={props.instructions}
                    onChangeFun={(text: any) =>
                      props.handleOnChangeText(text, 'instruction')
                    }
                    errorMessage={props.instructionsError}
                    setErrorMessage={props.setInstructionNameError}
                    isMultiline={false}
                    isBorder={false}
                  />
                </View>
                <View style={styles.vwSwitchcontainer}>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    onPress={props.toggleisDefault}
                  >
                    <Image
                      source={
                        props.isdefaultsave === true
                          ? images.imgSelectRadio
                          : images.imgUnselectRadio
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.lblSwitchTitle} numberOfLines={1}>
                    {getTranslation('addfavouriteaddresslabel')}
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View
              style={{
                marginBottom:
                  props.insets.bottom > 0
                    ? props.insets.bottom
                    : props.insets.bottom + getHeight(16),
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
                // btnPress={props.handlePressDeleteAccount}
                btnTitle={getTranslation('cancleaddress')}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* CancleModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.cancleOrderVisible}
        statusBarTranslucent={true}
        onRequestClose={props.funCloseCancleOrder}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={props.funCloseCancleOrder} />

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
            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseCancleOrder} // close modal
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
                    props.insets.bottom > 0
                      ? props.insets.bottom
                      : props.insets.bottom + getHeight(16),
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
