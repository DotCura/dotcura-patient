import React, { useEffect, useRef, useState } from 'react';
import LoginComponent from '../../../components/auth/Login';
import AppHeader from '../../../global/Header';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPhoneNumber } from '../../../constants/TextInputConstant';
import { regex } from '../../../constants/Regex';
import { ScreenNames } from '../../../constants/AppConstants';
import { Platform } from 'react-native';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { flashMessageSucess, flashMessageWarning } from '../../../constants/GConstant';
import { APIManager } from '../../../api/APIManager';
import { DeviceInfoManager } from '../../../constants/utils/DeviceInfo';

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
      // navigation.navigate(ScreenNames.OTPCONTAINER);
      await _loginApi();
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

  //=========================== API ========================================

  const _loginApi = async () => {
    try {
      console.log('callLogin Api');
      toggleLoader(true);
      const plainText = phoneNumber.replace(/ /g, '');

      const params = {
        country_code: callingCode,
        phone_number: plainText,
        device_token: '0',
        device_type: Platform.OS == 'ios' ? 'I' : 'A',
        os_version: DeviceInfoManager.getSystemVersion(),
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        if (responseData.code === StatusCode.OTP_NOT_VERIFIED) {
          console.log(responseData, 'RESPONSELOGIN');
          flashMessageSucess(responseData.message);
          navigation.navigate(ScreenNames.OTPCONTAINER, {
            LoginData: responseData.data,
          });
        }
        else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.LOGIN,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  return (
    <LoginComponent
      navigation={navigation}
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
