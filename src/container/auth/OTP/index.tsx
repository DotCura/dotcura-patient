import {
  AppState,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../../global/Header';
import { regex } from '../../../constants/Regex';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { OTPManager } from '../../../constants/utils/OTP';
import OTPComponent from '../../../components/auth/OTP';
import { ScreenNames } from '../../../constants/AppConstants';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { APIManager } from '../../../api/APIManager';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { CommonActions } from '@react-navigation/native';
import { ZustandStores } from '../../../store';

interface OtpArray {
  value: string;
  ref: RefObject<TextInput | null>;
}

const OTPContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { setPatientId } = ZustandStores.UserStore();

  const [countrycode, setCountryCode] = useState('+39');
  const [phoneNumber, setPhoneNumber] = useState('1234561234');
  const [otpArray, setOtpArray] = useState<OtpArray[]>([
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
    {
      value: '',
      ref: useRef<TextInput>(null),
    },
  ]);
  const [fullOtp, setFullOtp] = useState<string | number>('');
  const [otp, setOtp] = useState<number>(30);

  const [resendOtp, setResendOtp] = useState(true);
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const appStateRef = useRef(AppState.currentState);
  const OTPTIMING = 30;

  //======API========
  const [loginDataParams, setLoginDataParams] = useState<any>(null);
  const [validateOtp, setValidateOtp] = useState<string>(
    route?.params?.LoginData?.otp,
  );

  useEffect(() => {
    console.log('validateOtp', validateOtp);
    console.log('loginDataParams', route?.params?.LoginData);
    setLoginDataParams(route?.params?.LoginData);
  }, [route?.params?.LoginData]);

  const handleOnChangeText = (text: string, index: number) => {
    if (regex.number.test(text)) {
      const updatedValue = [...otpArray];
      updatedValue[index].value = text;
      setOtpArray(updatedValue);
      if (text?.length === 1) {
        handleOnSubmit(index);
      }
    }
  };

  const handleOnSubmit = (index: number) => {
    if (index === otpArray.length - 1) {
      Keyboard.dismiss();
    } else {
      const updatedValue = [...otpArray];
      updatedValue[index + 1].ref?.current?.focus();
      setOtpArray(updatedValue);
    }
  };

  const handleOnKeyPress = ({ nativeEvent }: any, item: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && item.value === '') {
      if (index > 0) {
        otpArray[index - 1].ref?.current?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (nativeEvent.key === 'Backspace') {
      handleOnChangeText('', index);
    }
  };

  const handleOnPressResendOtp = async () => {
    await _reSendOTPApi();
  };

  const handleResendOtpTimer = async () => {
    OTPManager.resendOtpStartTimerReverse(
      30,
      setOtp,
      setResendOtp,
      timerRef,
      startTimeRef,
      appStateRef,
    );
  };

  const handleOnPressNext = async () => {
    console.log('fullOtp !== validateOtp', fullOtp !== validateOtp);
    console.log('fullOtp !== validateOtp', fullOtp);
    console.log('fullOtp !== validateOtp', validateOtp);

    if (fullOtp.toString().length !== 6) {
      flashMessageWarning(getTranslation('errorMessageOtp'));
    } else if (fullOtp != validateOtp) {
      flashMessageWarning(getTranslation('errorMessageInvalidOtp'));
    } else {
      await _verifyOTPApi();
    }
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
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

  // For storing otp in another state
  useEffect(() => {
    const fullOtp = otpArray.map((item: any) => item?.value).join('');
    if (fullOtp) {
      setFullOtp(Number(fullOtp));
    } else {
      setFullOtp('');
    }
  }, [otpArray]);

  useEffect(() => {
    handleResendOtpTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    header();
  }, []);

  //=========================== API ========================================

  const _reSendOTPApi = async () => {
    try {
      const params = {
        country_code: loginDataParams?.country_code,
        phone_number: loginDataParams?.phone_number,
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api OTP');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          console.log(responseData, 'RESPONSE OTP');
          flashMessageSucess(responseData.message);
          const clearedOtpArray = otpArray.map(item => ({
            ...item,
            value: '',
          }));
          setOtpArray(clearedOtpArray);
          setFullOtp('');
          handleResendOtpTimer();
          setValidateOtp(responseData?.data?.otp);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.RESENDOTP,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  const _verifyOTPApi = async () => {
    try {
      const params = {
        country_code: loginDataParams?.country_code,
        phone_number: loginDataParams?.phone_number,
        otp_code: validateOtp,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        console.log(responseData, 'resposneDate verify otp');
        console.log(typeof responseData.code, 'code');
        console.log(typeof StatusCode.STEP_ONE, 'step');
        if (responseData.code === StatusCode.SUCCESS) {
          console.log(
            'responseData.data.device.token',
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userToken,
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          MmkvManager.getData(MmkvManager.Keys.userDetails, value => {
            console.log('checking userdetails', value);
          });
          flashMessageSucess(responseData.message);
          MmkvManager.setData(MmkvManager.Keys.isLoggedIn, 'true');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: ScreenNames.BOTTOMTABNAVIGATION }],
            }),
          );
          setPatientId(responseData.data.id);

        } else if (responseData.code === StatusCode.STEP_ONE) {
          console.log(
            'responseData.data.device.token',
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userToken,
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          MmkvManager.getData(MmkvManager.Keys.userDetails, value => {
            console.log('checking userdetails', value);
          });
          flashMessageSucess(responseData.message);
          navigation.navigate(ScreenNames.COMPLETEPROFILECONTAINER, {
            LoginData: responseData.data,
          });
          setPatientId(responseData.data.id);

        } else if (responseData.code === StatusCode.STEP_TWO) {
          console.log(
            'responseData.data.device.token',
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userToken,
            responseData.data.device.token,
          );
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          MmkvManager.getData(MmkvManager.Keys.userDetails, value => {
            console.log('checking userdetails', value);
          });
          flashMessageSucess(responseData.message);
          navigation.navigate(ScreenNames.INFOATIONCONASATNTCONTAINER, {
            LoginData: responseData.data,
          });
          setPatientId(responseData.data.id);

        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.VERIFYOTP,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  return (
    <OTPComponent
      navigation={navigation}
      otpArray={otpArray}
      countrycode={countrycode}
      phoneNumber={phoneNumber}
      insets={insets}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnKeyPress={handleOnKeyPress}
      otp={otp}
      resendOtp={resendOtp}
      handleOnPressResendOtp={handleOnPressResendOtp}
      OTPTIMING={OTPTIMING}
      handleOnPressNext={handleOnPressNext}
      loginDataParams={loginDataParams}
    />
  );
};

export default OTPContainer;
