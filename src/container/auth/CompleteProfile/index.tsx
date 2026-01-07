import React, { useCallback, useRef, useState } from 'react';
import CompleteProfileComponent from '../../../components/auth/CompleteProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  InputTypesEnum,
  isValidInput,
} from '../../../constants/TextInputConstant';
import { regex } from '../../../constants/Regex';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { ScreenNames } from '../../../constants/AppConstants';
import { BackHandler, Keyboard } from 'react-native';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { flashMessageWarning } from '../../../constants/GConstant';
import { APIManager } from '../../../api/APIManager';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { MmkvManager } from '../../../constants/utils/MmkvManager';

const CompleteProfileContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];

  const [fullName, setFullName] = useState<any>('');
  const [surname, setSurname] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [taxCode, setTaxCode] = useState<any>('');
  const [selectedGender, setSelectedGender] = useState(1);

  const [fullNameError, setFullNameError] = useState<any>('');
  const [surnameError, setSurnameError] = useState<any>('');
  const [emailError, setEmailError] = useState<any>('');
  const [taxCodeError, setTaxCodeError] = useState<any>('');

  const fullNameRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const taxCodeRef = useRef<any>(null);


  //=== BackHandler ====
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Prevent default back action
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const onChangeFullName = (text: any) => {
    let newText = text.replace(/[0-9]/g, '');
    newText = newText.replace(/^\s+/, '');
    newText = newText.replace(/\s{2,}/g, ' ');
    setFullName(newText);
  };

  const onChangeSurname = (text: any) => {
    let newText = text.replace(/[0-9]/g, '');
    newText = newText.replace(/^\s+/, '');
    newText = newText.replace(/\s{2,}/g, ' ');
    setSurname(newText);
  };

  const onChangeEmail = (text: any) => {
    const formatted = text
      .replace(/^\s+/, '')
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(formatted);
  };

  const onChangeTaxCode = (text: any) => {
    const formatted = text
      .replace(/^\s+/, '')
      .replace(/\s+/g, '')
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 16);
    setTaxCode(formatted);
  };

  const handlePressContinue = async () => {
    // Reset previous errors
    setFullNameError('');
    setEmailError('');
    setTaxCodeError('');
    setSurnameError('');

    if (!fullName.trim()) {
      setFullNameError(getTranslation('errorMessageFullNameRequired'));
      return;
    } else if (fullName.trim().length < 2) {
      setFullNameError(getTranslation('errorMessageFullNameTooShort'));
      return;
    } else if (!surname.trim()) {
      setSurnameError(getTranslation('errorMessageSurnameRequired'));
      return;
    } else if (!email.trim()) {
      setEmailError(getTranslation('errorMessageEmail'));
      return;
    } else if (!regex.email.test(email.trim())) {
      setEmailError(getTranslation('errorMessageValidEmail'));
      return;
    } else if (!taxCode.trim()) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeRequired'));
      return;
    } else if (taxCode.length !== 16) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeValid'));
      return;
    } else {
      console.log('✅ Profile completed successfully');
      Keyboard.dismiss();
      // Proceed to next screen or API call
      await _completeProfileApi();
    }
  };

  //=========================== API ========================================

  const _completeProfileApi = async () => {
    try {
      const params = {
        steps: '1',
        name: fullName + ' ' + surname,
        email: email,
        first_name:fullName,
        last_name:surname,
        tax_code:taxCode,
        gender: selectedGender == 1 ? 'male' : 'female',
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api COMPLETE PROFILE');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          console.log(responseData, 'COMPLETE PROFILE');
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          navigation.navigate(ScreenNames.INFOATIONCONASATNTCONTAINER);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.COMPLETEPROFILE,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  return (
    <CompleteProfileComponent
      navigation={navigation}
      insets={insets}
      headerArray={headerArray}
      fullName={fullName}
      surname={surname}
      email={email}
      taxCode={taxCode}
      fullNameError={fullNameError}
      surnameError={surnameError}
      setFullNameError={setFullNameError}
      setSurnameError={setSurnameError}
      emailError={emailError}
      setEmailError={setEmailError}
      taxCodeError={taxCodeError}
      setTaxCodeError={setTaxCodeError}
      setFullName={setFullName}
      setEmail={setEmail}
      setTaxCode={setTaxCode}
      fullNameRef={fullNameRef}
      surnameRef={surnameRef}
      emailRef={emailRef}
      taxCodeRef={taxCodeRef}
      onChangeFullName={onChangeFullName}
      onChangeSurname={onChangeSurname}
      onChangeEmail={onChangeEmail}
      onChangeTaxCode={onChangeTaxCode}
      handlePressContinue={handlePressContinue}
      genders={genders}
      selectedGender={selectedGender}
      setSelectedGender={setSelectedGender}
    />
  );
};

export default CompleteProfileContainer;
