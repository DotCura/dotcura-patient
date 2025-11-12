import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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

const CheckoutComponent = (props: any) => {
  return (
    <View style={[constnatStyles.vwContainer]}>
      {/* vwHeader */}
      <View style={{}}>
        <View style={[styles.vwMain, { paddingTop: props.insets.top + 10 }]}>
          <View style={styles.vwHeaderLeft}>
            <TouchableOpacity
              activeOpacity={activityOpacity}
              style={styles.btnBack}
              onPress={props.startBtnOnPress}
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

          <TouchableOpacity
            style={styles.vwSave}
            activeOpacity={activityOpacity}
          >
            <Text style={styles.lblSave}>{getTranslation('edit')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* scrollContent */}
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: 0,
            paddingBottom: getHeight(130),
          },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
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
                  Domani entro le 10:00
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnAdd}
                activeOpacity={activityOpacity}
              >
                <Text style={styles.lblChnage}>{getTranslation('add')}</Text>
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
                Via Roma, 31 - Napoli
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnChange}
              activeOpacity={activityOpacity}
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
      {/* Fixed Bottom Button */}
      <View
        style={{
          position: 'absolute',
          bottom: props.insets.bottom || 0,
          left: 0,
          right: 0,
          marginHorizontal: getWidth(16),
          gap: getHeight(8),
        }}
      >
        <CustomButton
          btnTitle={getTranslation('savechnages')}
          // onPress={props.onProceedToPayment}
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
    </View>
  );
};

export default CheckoutComponent;
