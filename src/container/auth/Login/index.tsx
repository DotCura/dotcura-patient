import React, { useEffect, useRef, useState } from 'react';
import LoginComponent from '../../../components/auth/Login';
import AppHeader from '../../../global/Header';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPhoneNumber } from '../../../constants/TextInputConstant';
import { regex } from '../../../constants/Regex';
import { ScreenNames } from '../../../constants/AppConstants';

const LoginContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  //useState
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [callingCode, setCallingCode] = useState<any>('39');

  const [phoneNumberError, setPhoneNumberError] = useState<any>('');

  const moblieNoRef = useRef<any>(null);

  //onChange
  const changeInput = (inputFieldName: any, text: any) => {
    switch (inputFieldName) {
      case 'Phone Number':
        setPhoneNumber(formatPhoneNumber(text));
        break;
      default:
        break;
    }
  };

  //handlePressSignUpFun
  const handlePressLoginFun = async () => {
    const plainText = phoneNumber.replace(/-/g, '');
    if (!callingCode) {
      setPhoneNumberError(getTranslation('errorMessageCountryCode'));
    } else if (!phoneNumber) {
      setPhoneNumberError(getTranslation('errorMessagePhoneNumber'));
      return;
    } else if (/^0+$/.test(plainText)) {
      setPhoneNumberError(getTranslation('errorMessageAllZero'));
      return;
    } else if (!regex.mobliedesh.test(phoneNumber)) {
      setPhoneNumberError(getTranslation('errorMesaageValidPhoenNumber'));
      return;
    } else {
      console.log('login done');
      navigation.navigate(ScreenNames.OTPCONTAINER);
    }
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <LoginComponent
      insets={insets}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      callingCode={callingCode}
      setCallingCode={setCallingCode}
      phoneNumberError={phoneNumberError}
      setPhoneNumberError={setPhoneNumberError}
      moblieNoRef={moblieNoRef}
      changeInput={changeInput}
      handlePressLoginFun={handlePressLoginFun}
    />
  );
};

export default LoginContainer;
