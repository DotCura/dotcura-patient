import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomButton from '../../../global/Buttons';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { activityOpacity } from '../../../constants/GConstant';
import AppHeader from '../../../global/Header';

const OTPComponent = (props: any) => {
  const masked = props?.loginDataParams?.phone_number
    .replace(/\d(?=\d{4})/g, '*')
    .replace(/(\*+)(\d{4})/, '$1 $2');
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={false}
        showSubTitle={false}
        showEndBtn={false}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {/* HeaderView */}
          <View style={styles.vwHeader}>
            <View style={constnatStyles.vwTitleSubtitles}>
              <Text style={constnatStyles.lblMainTitle}>
                {getTranslation('otptitle')}
              </Text>
              <Text style={constnatStyles.lblMainSubtitle}>
                {getTranslation('otpsubtitle1')}{' '}
                <Text style={styles.lblPhoneNumber}>
                  +{props?.loginDataParams?.country_code} {masked}.
                </Text>{' '}
                {getTranslation('otpsubtitle2')}
              </Text>
            </View>
          </View>

          {/* inputView */}
          <View style={styles.vwOtpMain}>
            {props?.otpArray?.map((item: any, index: any) => {
              return (
                <View style={styles.vwTxtInput} key={index}>
                  <TextInput
                    maxLength={1}
                    placeholderTextColor={Colors.blue17}
                    selectionColor={Colors.gray75}
                    cursorColor={Colors.gray75}
                    inputMode="numeric"
                    style={styles.txtInput}
                    value={item?.value}
                    ref={item?.ref}
                    blurOnSubmit={index == props?.otpArray?.length - 1}
                    returnKeyType={
                      index == props?.otpArray?.length - 1 ? 'default' : 'next'
                    }
                    onChangeText={text => {
                      props.handleOnChangeText(text, index);
                    }}
                    onKeyPress={nativeEvent => {
                      props.handleOnKeyPress(nativeEvent, item, index);
                    }}
                    onSubmitEditing={() => {
                      props?.handleOnSubmit(index);
                    }}
                  />
                </View>
              );
            })}
          </View>
          <Text style={styles.lblResendWarning}>
            {getTranslation('otpwarning1')} {props.OTPTIMING}{' '}
            {getTranslation('otpwarning2')}
          </Text>
        </View>
      </KeyboardAwareScrollView>
      {/* vwBottomBtn */}
      <View
        style={[
          styles.vwBottom,
          {
            marginBottom: props.insets.bottom + getHeight(10),
            marginHorizontal: getWidth(16),
          },
        ]}
      >
        <CustomButton
          btnPress={props.handleOnPressNext}
          btnTitle={getTranslation('next')}
        />
        <TouchableOpacity
          activeOpacity={activityOpacity}
          disabled={props.resendOtp}
          onPress={props.handleOnPressResendOtp}
          style={{ marginTop: getHeight(21) }}
        >
          {!props.resendOtp ? (
            <Text style={styles.lblResendOtp}>
              {getTranslation('resendcode')}
            </Text>
          ) : (
            <Text style={styles.lblDidntgetOtp}>
              {/* {getTranslation('ifYouDidntReceiveCodeTitle')}{' '} */}
              <Text style={[styles.lblResendOtp, { color: Colors.blue002 }]}>
                00:{props?.otp?.toString().padStart(2, '0')}
              </Text>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OTPComponent;
