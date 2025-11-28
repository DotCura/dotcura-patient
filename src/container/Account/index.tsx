import { View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { flashMessageWarning } from '../../constants/GConstant';
import { ScreenNames } from '../../constants/AppConstants';
import AppHeader from '../../global/Header';
import AccountComponent from '../../components/Account';
import { regex } from '../../constants/Regex';

const AccountContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];

  const [fullName, setFullName] = useState<any>('');
  console.log(fullName, 'fullName =====');
  const [surname, setSurname] = useState<any>('');
  const [taxCode, setTaxCode] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [dateOfBirth, setDateOfBirth] = useState<any>('');
  const [selectedGender, setSelectedGender] = useState(1);

  const [fullNameError, setFullNameError] = useState<any>('');
  const [surnameError, setSurnameError] = useState<any>('');
  const [emailError, setEmailError] = useState<any>('');
  const [dateError, setDateError] = useState<any>('');
  const [taxCodeError, setTaxCodeError] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formatedDateForApi, setFormatedDateForApi] = useState('');

  const fullNameRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);
  const taxCodeRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

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

  const handlePressContinue = () => {
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
    } else if (formattedDate == '') {
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

      navigation.goBack();
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
          centerSubTitle={'Giovanni (tu)'}
          showEndBtn={true}
          isSaveIcon={true}
          onClickSave={handlePressContinue}
        />
      ),
    });
  };

  useEffect(() => {
    console.log('hy');

    header();
  });

  //model
  const [patologie, setPatologie] = useState([
    {
      id: 1,
      name: 'Disordine alimentare',
    },
  ]);
  const [medicazioni, setMedicazioni] = useState([]);
  const [allergie, setAllergie] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<any>('');
  const [modalData, setModalData] = useState<any>([]);
  const [modalSelected, setModalSelected] = useState<any>([]);
  const [modalType, setModalType] = useState<any>('');

  const patologieData = [
    { id: 1, name: 'Disordine alimentare' },
    { id: 2, name: 'Disordine renale' },
    { id: 3, name: 'Disordine del fegato' },
    { id: 4, name: 'Disordine di alterazione mentale' },
  ];

  const allergieData = [
    { id: 10, name: 'Polline' },
    { id: 11, name: 'Polvere' },
    { id: 12, name: 'Lattosio' },
    { id: 13, name: 'Glutine' },
  ];
  const medicazioneData = [
    { id: 14, name: 'Aspirina' },
    { id: 15, name: 'Ibuprofene' },
    { id: 16, name: 'Paracetamolo' },
  ];

  const openModal = (type: any) => {
    setModalType(type);

    if (type === 'patologie') {
      setModalTitle('Aggiungi patologia');
      setModalData(patologieData);
      setModalSelected(patologie);
    }

    if (type === 'medicazioni') {
      setModalTitle('Aggiungi medicazione');
      setModalData(medicazioneData);
      setModalSelected(medicazioni);
    }

    if (type === 'allergie') {
      setModalTitle('Aggiungi allergia');
      setModalData(allergieData);
      setModalSelected(allergie);
    }

    setModalVisible(true);
  };

  const handleSave = (selected: any) => {
    if (modalType === 'patologie') setPatologie(selected);

    if (modalType === 'medicazioni') setMedicazioni(selected);

    if (modalType === 'allergie') setAllergie(selected);

    setModalVisible(false);
  };

  const handleDeleteItem = (type: any, id: any) => {
    if (type === 'patologie') {
      setPatologie(prev => prev.filter(item => item.id !== id));
    }

    if (type === 'medicazioni') {
      setMedicazioni(prev => prev.filter((item: any) => item.id !== id));
    }

    if (type === 'allergie') {
      setAllergie(prev => prev.filter((item: any) => item.id !== id));
    }
  };

  return (
    <AccountComponent
      formattedDate={formattedDate}
      insets={insets}
      fullName={fullName}
      email={email}
      surname={surname}
      taxCode={taxCode}
      dateOfBirth={dateOfBirth}
      fullNameError={fullNameError}
      setFullNameError={setFullNameError}
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
      emailRef={emailRef}
      surnameRef={surnameRef}
      taxCodeRef={taxCodeRef}
      onChangeSurname={onChangeSurname}
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
    />
  );
};

export default AccountContainer;
