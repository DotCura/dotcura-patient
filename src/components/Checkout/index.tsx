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

const CheckoutComponent = (props: any) => {
  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingBottom: getHeight(200),
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
              isRenderLeftIcon={true}
            />
          </View>
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
          <TouchableOpacity
            style={styles.btnEdit}
            activeOpacity={activityOpacity}
            onPress={props.funOpenIsModifyOrder}
          >
            <Image source={images.pencilblue} />
            <Text style={styles.lblEdit}>{getTranslation('edit')}</Text>
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
                  {props.selectedSlot
                    ? getTranslation('change')
                    : getTranslation('add')}
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

            {props.discountValue > 0 && (
              <View style={styles.summaryItemRow}>
                <Text style={[styles.summaryLabel]}>
                  {getTranslation('discount')}
                </Text>
                <Text style={[styles.summaryValue, { color: Colors.green17 }]}>
                  -{currency} {props.discountValue.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={[styles.summaryItemRow]}>
              <Text
                style={[styles.summaryLabel, { fontFamily: fontsfamily.bold }]}
              >
                {getTranslation('total')}
              </Text>
              <Text
                style={[styles.summaryValue, { fontFamily: fontsfamily.bold }]}
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
              style={[
                styles.btnChange,
                { backgroundColor: Colors.lightBlurE4 },
              ]}
              activeOpacity={activityOpacity}
              onPress={props.onApplyDiscount}
            >
              <Text style={styles.lblChnage}>{getTranslation('add')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* bottom button */}
      <View style={[styles.vwBottomBtn, { bottom: props.insets.bottom }]}>
        <CustomButton
          btnTitle={getTranslation('savechnages')}
          btnPress={props.handleOnPressSaveChanges}
        />
        <CustomButton
          btnTitle={getTranslation('canclebooking')}
          style={{ backgroundColor: Colors.white }}
          btnicon={true}
          btnImage={images.imgDelete}
          textStyle={{ color: Colors.red8C }}
          // onPress={props.onProceedToPayment}
        />
      </View>

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
                  console.log('callend');
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
                    console.log('callend');
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
        onRequestClose={props.funCloseIsKitTestDetails}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.funCloseIsKitTestDetails}
          />

          <View
            style={{
              backgroundColor: Colors.white,
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
                  Anemia
                </Text>
                <Text
                  style={[constnatStyles.lblSubHeaderTitle]}
                  numberOfLines={2}
                >
                  1 {getTranslation('selected')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>
            <View style={{ marginHorizontal: getWidth(16) }}>
              <FlatList
                onEndReached={() => {
                  console.log('callend');
                }}
                data={props.kitsArrayData}
                renderItem={props.renderItemKitsData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  marginTop: getHeight(16),
                  gap: getHeight(20),
                  paddingBottom: getHeight(155),
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
                  {getTranslation('gotocart')}
                </Text>
              </View>
              <View style={styles.vwPrice}>
                {props.selectedTests.length === props.kitsArrayData.length && (
                  <Text style={styles.disprice}>{currency}0.54</Text>
                )}
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
        selectedId={props?.selectedAddress?.id}
        onSelect={(item: any) => props.setSelectedAddress(item)}
        onAddAddress={() => {
          props.setAddressPopupVisible(false);
          props.navigation.navigate(ScreenNames.ADDADDRESSCONTAINER, {
            isfromcheckout: true,
          });
        }}
        onClose={() => props.setAddressPopupVisible(false)}
      />
    </>
  );
};

export default CheckoutComponent;
