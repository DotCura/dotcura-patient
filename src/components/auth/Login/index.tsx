import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import { styles } from './styles';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { getHeight } from '../../../constants/utils/Dimensions';
import CustomButton from '../../../global/Buttons';
import PrimaryTitleMoblieNumber from '../../../global/PrimaryTitleMoblieNumber';
import { ValidationConstant } from '../../../constants/TextInputConstant';

const LoginComponent = (props: any) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[constnatStyles.keyboardContainer]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{flex:1}}>
      {/* HeaderView */}
      <View style={styles.vwHeader}>
        <TitleSubtitle
          title={getTranslation('logintitle')}
          subtitle={getTranslation('loginsubtitle')}
        />
      </View>

      {/* inputView */}
      <View style={styles.vwInput}>
        <PrimaryTitleMoblieNumber
          blur={false}
          label={getTranslation('moblieno')}
          value={props.phoneNumber}
          onChangeFun={(text: any) => props.changeInput('Phone Number', text)}
          maxLength={ValidationConstant.maxMobileDigit}
          callingCode={props.callingCode}
          setCallingCode={props.setCallingCode}
          refs={props.moblieNoRef}
          inputLabel={getTranslation('moblieno')}
          errorMessage={props.phoneNumberError}
          setErrorMessage={props.setPhoneNumberError}
          leftIcon={false}
          isBorder={false}
          placHolderLabel={"333 000 000"}
        />
      </View>
      </View>

      {/* vwBottomBtn */}
      <View
        style={[
          styles.vwBottom,
          { marginBottom: props.insets.bottom + getHeight(16) },
        ]}
      >
        <CustomButton
          btnPress={props.handlePressLoginFun}
          btnTitle={getTranslation('next')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginComponent;
