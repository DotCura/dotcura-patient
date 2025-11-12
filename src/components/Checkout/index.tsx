import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
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
import { fontSize } from '../../constants/FontSizes';

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
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: 0,
            paddingBottom: getHeight(250),
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
          <TouchableOpacity style={styles.btnEdit}>
            <Image source={images.pencilblue} />
            <Text style={styles.lblEdit}>{getTranslation('edit')}</Text>
          </TouchableOpacity>
        </View>

        {/* vwDateTime */}
        <View style={{ marginTop: getHeight(24) }}>
          <Text style={styles.lblHomeService}>
            {getTranslation('homesevice')}
          </Text>
          <View
            style={{
              backgroundColor: Colors.redFC,
              padding: 4,
              borderRadius: 20,
              marginTop: getHeight(4),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: Colors.redCA,
                borderRadius: 20,
                paddingVertical: getHeight(12),
                paddingHorizontal: getWidth(16),
                backgroundColor: Colors.white,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.lblDateAndTime}>
                  {getTranslation('dateandtime')}
                </Text>
                <Text style={styles.lblDateAndTimeValue}>
                  Domani entro le 10:00
                </Text>
              </View>
              <TouchableOpacity style={styles.btnAdd}>
                <Text style={styles.lblChnage}>{getTranslation('add')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* vwAddress */}
        <ImageBackground
          source={images.imgAddessManager}
          style={{
            height: getHeight(167),
            marginTop: getHeight(12),
            borderRadius: 24,
            padding: 16,
            overflow: 'hidden',
          }}
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
            <TouchableOpacity style={styles.btnChange}>
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
    </View>
  );
};

export default CheckoutComponent;
