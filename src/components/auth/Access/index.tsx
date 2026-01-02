import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import CustomButton from '../../../global/Buttons';
import { getHeight } from '../../../constants/utils/Dimensions';
import PrimaryTitleTextInput from '../../../global/PrimaryTitleTextInput';
import PrimaryTitleMoblieNumber from '../../../global/PrimaryTitleMoblieNumber';
import { ValidationConstant } from '../../../constants/TextInputConstant';
import AppHeader from '../../../global/Header';

const AccessComponent = (props: any) => {
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
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
            <TitleSubtitle
              title={getTranslation('accesstitle')}
              subtitle={getTranslation('accesssubtitle')}
            />
            <View style={{ marginTop: getHeight(28), gap: getHeight(16) }}>
              <PrimaryTitleTextInput
                placHolderLabel={getTranslation('emailplaceholder')}
                refs={props.emailRef}
                focusnext={() => props.moblieNoRef.current?.focus()}
                inputLabel={getTranslation('emailtitle')}
                blur={false}
                leftIcon={false}
                keyaboardType={'email-address'}
                value={props.email}
                onChangeFun={props.onChangeEmail}
                autoCapitalize={'none'}
                errorMessage={props.emailError}
                setErrorMessage={props.setEmailError}
                isMultiline={false}
                isBorder={true}
              />
              <PrimaryTitleMoblieNumber
                blur={true}
                label={getTranslation('moblieno')}
                value={props.phoneNumber}
                onChangeFun={(text: any) =>
                  props.changeInput('Phone Number', text)
                }
                maxLength={ValidationConstant.maxMobileDigit}
                callingCode={props.callingCode}
                setCallingCode={props.setCallingCode}
                refs={props.moblieNoRef}
                inputLabel={getTranslation('moblieno')}
                errorMessage={props.phoneNumberError}
                setErrorMessage={props.setPhoneNumberError}
                leftIcon={false}
                isBorder={false}
                placHolderLabel={'333 000 000'}
              />
            </View>
          </View>
        </View>
        {/* vwBottomBtn */}
        <View
          style={[
            {
              marginBottom:
              props.insets.bottom + 10,
            },
          ]}
        >
          <CustomButton
            btnPress={props.handleSaveAccess}
            btnTitle={getTranslation('save')}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AccessComponent;
