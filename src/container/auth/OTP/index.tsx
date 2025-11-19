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

interface OtpArray {
  value: string;
  ref: RefObject<TextInput | null>;
}

const OTPContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
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
  const [validateOtp, setValidateOtp] = useState<string>('123456' || '');
  const [resendOtp, setResendOtp] = useState(true);
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const appStateRef = useRef(AppState.currentState);
  const OTPTIMING = 30;

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
    flashMessageSucess(getTranslation('otpResendSuccessfully'));

    const clearedOtpArray = otpArray.map(item => ({
      ...item,
      value: '',
    }));
    setOtpArray(clearedOtpArray);
    setFullOtp('');
    handleResendOtpTimer();
  };

  const handleResendOtpTimer = () => {
    OTPManager.resendOtpStartTimerReverse(
      30,
      setOtp,
      setResendOtp,
      timerRef,
      startTimeRef,
      appStateRef,
    );
  };

  const handleOnPressNext = () => {
    if (fullOtp.toString().length !== 6) {
      flashMessageWarning(getTranslation('errorMessageOtp'));
    } else if (fullOtp != validateOtp.toString()) {
      flashMessageWarning(getTranslation('errorMessageInvalidOtp'));
    } else {
      navigation.navigate(ScreenNames.COMPLETEPROFILECONTAINER);
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

  return (
    <OTPComponent
      otpArray={otpArray}
      insets={insets}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnKeyPress={handleOnKeyPress}
      otp={otp}
      resendOtp={resendOtp}
      handleOnPressResendOtp={handleOnPressResendOtp}
      OTPTIMING={OTPTIMING}
      handleOnPressNext={handleOnPressNext}
    />
  );
};

export default OTPContainer;
