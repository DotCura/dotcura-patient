import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import AppHeader from '../../global/Header';
import AccountComponent from '../../components/Account';
import { regex } from '../../constants/Regex';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { useFocusEffect } from '@react-navigation/native';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';

const AccountContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];

  const [fullName, setFullName] = useState<any>('');
  const [placeOfBirth, setPlaceOfBirth] = useState<any>('');
  const [surname, setSurname] = useState<any>('');
  const [taxCode, setTaxCode] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [dateOfBirth, setDateOfBirth] = useState<any>('');
  const [selectedGender, setSelectedGender] = useState(1);

  const [fullNameError, setFullNameError] = useState<any>('');
  const [placeOfBirthError, setPlaceOfBirthErrorError] = useState<any>('');
  const [surnameError, setSurnameError] = useState<any>('');
  const [emailError, setEmailError] = useState<any>('');
  const [dateError, setDateError] = useState<any>('');
  const [taxCodeError, setTaxCodeError] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formatedDateForApi, setFormatedDateForApi] = useState('');

  const fullNameRef = useRef<any>(null);
  const placeOfBirthRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);
  const taxCodeRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

  const onChangeFullName = (text: any) => {
    let newText = text.replace(/[0-9]/g, '');
    newText = newText.replace(/^\s+/, '');
    newText = newText.replace(/\s{2,}/g, ' ');
    setFullName(newText);
  };
  const onChagePlaceOfBirth = (text: any) => {
    let newText = text.replace(/[0-9]/g, '');
    newText = newText.replace(/^\s+/, '');
    newText = newText.replace(/\s{2,}/g, ' ');
    setPlaceOfBirth(newText);
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
    console.log('call');

    // Reset previous errors
    setFullNameError('');
    setEmailError('');
    setTaxCodeError('');
    setSurnameError('');
    setPlaceOfBirthErrorError('');

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
    } else if (placeOfBirth == null) {
      setPlaceOfBirthErrorError(
        getTranslation('errorMessagePlaceOfBirthRequired'),
      );
      return;
    } else if (formattedDate === '') {
      flashMessageWarning(getTranslation('pleaseselectdateofbirth'));
      return;
    } else if (!taxCode.trim()) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeRequired'));
      return;
    } else if (taxCode.length !== 16) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeValid'));
      return;
    } else {
      console.log('✅ Profile completed successfully');
      await _updateProfileApi();
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // Format for API (YYYY-MM-DD)
    const formatedDateForApi = moment(date).format('YYYY-MM-DD');
    setFormatedDateForApi(formatedDateForApi);
    console.log(formatedDateForApi);

    // Format for Display (DD/MM/YYYY)
    const formatted = moment(date).format('DD/MM/YYYY');
    setFormattedDate(formatted);
    console.log(formatted);

    hideDatePicker();
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            navigation.pop();
          }}
          centerTitle={getTranslation('account')}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={true}
          centerSubTitle={`${fullName} (tu)`}
          showEndBtn={true}
          isSaveIcon={true}
          onClickSave={handlePressContinue}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //model
  const [patologie, setPatologie] = useState<any>([]);
  const [medicazioni, setMedicazioni] = useState<any>([]);
  const [allergie, setAllergie] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<any>('');
  const [modalData, setModalData] = useState<any>([]);
  const [modalSelected, setModalSelected] = useState<any>([]);
  const [modalType, setModalType] = useState<any>('');
  const [medicalList, setMedicalList] = useState<any[]>([]);

  const openModal = async (type: 'patologie' | 'medicazioni' | 'allergie') => {
    setModalType(type);

    if (type === 'patologie') {
      setModalTitle('Aggiungi patologia');
      await _getMedicalHistory('P');
      setModalSelected(patologie);
    }

    if (type === 'medicazioni') {
      setModalTitle('Aggiungi medicazione');
      await _getMedicalHistory('M');
      setModalSelected(medicazioni);
    }

    if (type === 'allergie') {
      setModalTitle('Aggiungi allergia');
      await _getMedicalHistory('A');
      setModalSelected(allergie);
    }

    setModalVisible(true);
  };

  const getMedicalType = (modalType: string): 'P' | 'M' | 'A' => {
    switch (modalType) {
      case 'patologie':
        return 'P';
      case 'medicazioni':
        return 'M';
      case 'allergie':
        return 'A';
      default:
        return 'M';
    }
  };

  const handleSave = async (selected: any[]) => {
    console.log("selected",selected);
    
    const medical_ids = selected.map(item => item.id);
    const type = getMedicalType(modalType); // 🔥 IMPORTANT

    try {
      const params = { type, medical_ids };

      const callback = async (res: any) => {
        if (res.code === StatusCode.SUCCESS) {
          flashMessageSucess(res.message);
          await _getPatientDetails();

          // if (modalType === 'patologie') setPatologie(selected);
          // if (modalType === 'medicazioni') setMedicazioni(selected);
          // if (modalType === 'allergie') setAllergie(selected);

          setModalVisible(false);
        } else {
          flashMessageWarning(res.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.MEDICAL.ADDMEDICALHISTORY,
        callback,
        params,
      });
    } catch (error) {
      console.log('add medical error:', error);
    }
  };

  const handleDeleteItem = (type: any, id: any) => {
    if (type === 'patologie') {
      setPatologie((prev: any) =>
        prev.filter((item: any) => item.deleteid !== id),
      );
    }

    if (type === 'medicazioni') {
      setMedicazioni((prev: any) =>
        prev.filter((item: any) => item.deleteid !== id),
      );
    }

    if (type === 'allergie') {
      setAllergie((prev: any) =>
        prev.filter((item: any) => item.deleteid !== id),
      );
    }
  };

  //====================API===============================

  const _getMedicalHistory = async (
    type: 'P' | 'M' | 'A',
    search: string = '',
  ) => {
    try {
      const params: any = {
        type,
      };

      // ✅ Add search ONLY if not empty
      if (search.trim().length > 0) {
        params.search = search.trim();
      }

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setMedicalList(responseData.data);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.MEDICAL.GETMEDICALHISTORY,
        callback,
        showLoader: search.trim().length === 0,
        params,
      });
    } catch (error) {
      console.log('medicalhistory error:', error);
    }
  };

  const _getPatientDetails = async () => {
    const params = {};

    try {
      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          const value = responseData.data;
          console.log('Patient Details API Response:', value);
          const DEFAULT_DOB = '';
          setFullName(value.first_name);
          setSurname(value.last_name);
          setEmail(value.email);
          setSelectedGender(value.gender === 'male' ? 1 : 2);
          setTaxCode(value.tax_code);
          setFormattedDate(
            value?.dob && moment(value.dob).isValid()
              ? moment(value.dob).format('DD/MM/YYYY')
              : DEFAULT_DOB,
          );
          setPlaceOfBirth(value.place_of_dob);
          setFormatedDateForApi(formatedDateForApi == null ? '' : value.dob);

          // 🔥 MEDICAL INFO MAPPING
          const medicalInfo = value.medical_info || {};

          const normalizeMedical = (arr: any[]) =>
            arr.map(item => ({
              id: item.medicalid,
              deleteid: item.id,
              name: item.name,
              type: item.type,
            }));

          setMedicazioni(normalizeMedical(medicalInfo.M ?? []));
          setPatologie(normalizeMedical(medicalInfo.P ?? []));
          setAllergie(normalizeMedical(medicalInfo.A ?? []));
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.SETTINGS.PATIENTDETAILS,
        callback,
        showLoader: true,
        params,
      });
    } catch (error) {
      console.log('patient details error:', error);
    }
  };

  const _updateProfileApi = async () => {
    try {
      const params = {
        name: fullName + ' ' + surname,
        email: email,
        first_name: fullName,
        last_name: surname,
        tax_code: taxCode,
        gender: selectedGender == 1 ? 'male' : 'female',
        place_of_dob: placeOfBirth,
        dob: formatedDateForApi,
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api UPDATE PROFILE');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          navigation.goBack();
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

  const _deleteMedicalHistory = async (
    medicalId: number,
    modalType: 'patologie' | 'medicazioni' | 'allergie',
  ) => {
    console.log("medicalId",medicalId);
    
    try {
      const params: any = {
        id: medicalId,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          handleDeleteItem(modalType, medicalId);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.MEDICAL.DELETEMEDICALHISTORY,
        callback,
        params,
        showLoader: false,
      });
    } catch (error) {
      console.log('delete medical error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      _getPatientDetails();
      return () => {};
    }, []),
  );

  return (
    <AccountComponent
      formattedDate={formattedDate}
      insets={insets}
      fullName={fullName}
      placeOfBirth={placeOfBirth}
      email={email}
      surname={surname}
      taxCode={taxCode}
      dateOfBirth={dateOfBirth}
      fullNameError={fullNameError}
      placeOfBirthError={placeOfBirthError}
      setFullNameError={setFullNameError}
      setPlaceOfBirthErrorError={setPlaceOfBirthErrorError}
      setSurnameError={setSurnameError}
      surnameError={surnameError}
      taxCodeError={taxCodeError}
      emailError={emailError}
      setEmailError={setEmailError}
      setTaxCodeError={setTaxCodeError}
      setFullName={setFullName}
      setTaxCode={setTaxCode}
      setEmail={setEmail}
      fullNameRef={fullNameRef}
      placeOfBirthRef={placeOfBirthRef}
      emailRef={emailRef}
      surnameRef={surnameRef}
      taxCodeRef={taxCodeRef}
      onChangeSurname={onChangeSurname}
      onChagePlaceOfBirth={onChagePlaceOfBirth}
      onChangeFullName={onChangeFullName}
      onChangeTaxCode={onChangeTaxCode}
      onChangeEmail={onChangeEmail}
      handlePressContinue={handlePressContinue}
      genders={genders}
      selectedGender={selectedGender}
      setSelectedGender={setSelectedGender}
      handleConfirm={handleConfirm}
      hideDatePicker={hideDatePicker}
      isDatePickerVisible={isDatePickerVisible}
      onPressOpenDate={showDatePicker}
      dateError={dateError}
      //model
      patologie={patologie}
      medicazioni={medicazioni}
      allergie={allergie}
      openModal={openModal}
      handleSave={handleSave}
      modalVisible={modalVisible}
      modalTitle={modalTitle}
      modalData={modalData}
      modalSelected={modalSelected}
      setModalVisible={setModalVisible}
      modalType={modalType}
      handleDeleteItem={handleDeleteItem}
      navigation={navigation}
      medicalList={medicalList}
      _getMedicalHistory={_getMedicalHistory}
      onDeleteMedical={_deleteMedicalHistory}
    />
  );
};

export default AccountContainer;
