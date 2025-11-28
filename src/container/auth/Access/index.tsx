import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import AccessComponent from '../../../components/auth/Access';
import AppHeader from '../../../global/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPhoneNumber } from '../../../constants/TextInputConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { regex } from '../../../constants/Regex';

const AccessContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [callingCode, setCallingCode] = useState<any>('39');
  const [email, setEmail] = useState<any>('');

  const [phoneNumberError, setPhoneNumberError] = useState<any>('');
  const [emailError, setEmailError] = useState<any>('');

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

  const onChangeEmail = (text: any) => {
    const formatted = text
      .replace(/^\s+/, '')
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(formatted);
  };

  const handleSaveAccess = () => {
    const plainText = phoneNumber.replace(/-/g, '');
    if (!email.trim()) {
      setEmailError(getTranslation('errorMessageEmail'));
      return;
    } else if (!regex.email.test(email.trim())) {
      setEmailError(getTranslation('errorMessageValidEmail'));
      return;
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
      navigation.goBack();
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
    <AccessComponent
      insets={insets}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      callingCode={callingCode}
      setCallingCode={setCallingCode}
      phoneNumberError={phoneNumberError}
      setPhoneNumberError={setPhoneNumberError}
      moblieNoRef={moblieNoRef}
      changeInput={changeInput}
      emailError={emailError}
      setEmailError={setEmailError}
      email={email}
      onChangeEmail={onChangeEmail}
      handleSaveAccess={handleSaveAccess}
    />
  );
};

export default AccessContainer;
