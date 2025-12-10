import { Keyboard, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  messages,
} from '../../constants/GConstant';
import AppHeader from '../../global/Header';
import AddFamilyMemberComponent from '../../components/AddFamilyMembers';
import TopBar from '../../global/TopBar/TopBar';
import { ScreenNames } from '../../constants/AppConstants';
import { ImagePickerManager } from '../../constants/utils/NativeImagePicker';

const AddFamilyMemberContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];
  const IdentityData = [
    { label: getTranslation('passport'), value: '1' },
    { label: getTranslation('electronicsidcard'), value: '2' },
  ];
  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);

  const [fullName, setFullName] = useState<any>('');
  const [surname, setSurname] = useState<any>('');
  const [appTypeValue, setAppTypeValue] = useState<any>('');
  const [identityValue, setIdentityValue] = useState<any>('');
  const [frontSide, setFrontSide] = useState(undefined);
  const [frontImageAdd, setFrontImageAdd] = useState(false);
  const [backSide, setBackSide] = useState(undefined);
  const [backImageAdd, setBackImageAdd] = useState(false);

  const [taxCode, setTaxCode] = useState<any>('');
  const [dateOfBirth, setDateOfBirth] = useState<any>('');
  const [selectedGender, setSelectedGender] = useState(1);

  const [fullNameError, setFullNameError] = useState<any>('');
  const [surnameError, setSurnameError] = useState<any>('');
  const [dateError, setDateError] = useState<any>('');
  const [taxCodeError, setTaxCodeError] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formatedDateForApi, setFormatedDateForApi] = useState('');

  const AppTypeData = [
    { label: 'Padre', value: '1' },
    { label: 'Madre', value: '2' },
    { label: 'Hermano', value: '3' },
    { label: 'Hermana', value: '4' },
    { label: 'Esposa', value: '5' },
  ];

  const handleSetRole = (item: any) => {
    setAppTypeValue(item.value);
  };

  const handleSetIdentity = (item: any) => {
    setIdentityValue(item.value);
  };

  const fullNameRef = useRef<any>(null);
  const taxCodeRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);

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
    setTaxCodeError('');
    setSurnameError('');

    if (appTypeValue == '') {
      flashMessageWarning(getTranslation('pleaseselecttypeofrelationship'));
    } else if (!fullName.trim()) {
      setFullNameError(getTranslation('errorMessageFullNameRequired'));
      return;
    } else if (fullName.trim().length < 2) {
      setFullNameError(getTranslation('errorMessageFullNameTooShort'));
      return;
    } else if (!surname.trim()) {
      setSurnameError(getTranslation('errorMessageSurnameRequired'));
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
    } else if (identityValue == '') {
      flashMessageWarning(getTranslation('pleaseselectdocument'));
    } else if (frontSide == undefined || backSide == undefined) {
      flashMessageWarning(getTranslation('pleaseuploadfrontandbackside'));
    } else {
      console.log('hy');
      navigation.navigate(ScreenNames.ADDFAMILYCONTAINER);
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

  const pickImage = () => {
    Keyboard.dismiss();

    checkPermission(cameraPermission, messages.cameraPermission)
      .then(isCameraAllow => {
        if (!isCameraAllow) {
          return;
        }

        return ImagePickerManager.choosePickerOptions('photo');
      })
      .then((result: any) => {
        if (!result) return;

        const uri = result[0]?.uri;
        if (!uri) return;

        setFrontSide(uri);
        setFrontImageAdd(true);
      })
      .catch(error => {
        console.log('🔥 Error in pickImage():', error);
      });
  };

  const pickBackImage = () => {
    Keyboard.dismiss();

    checkPermission(cameraPermission, messages.cameraPermission)
      .then(isCameraAllow => {
        if (!isCameraAllow) {
          return;
        }

        return ImagePickerManager.choosePickerOptions('photo');
      })
      .then((result: any) => {
        if (!result) return;

        const uri = result[0]?.uri;
        if (!uri) return;

        setBackSide(uri);
        setBackImageAdd(true);
      })
      .catch(error => {
        console.log('🔥 Error in pickBackImage():', error);
      });
  };

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

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
          centerTitle={getTranslation('family')}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <AddFamilyMemberComponent
    navigation={navigation}
      formattedDate={formattedDate}
      insets={insets}
      fullName={fullName}
      taxCode={taxCode}
      dateOfBirth={dateOfBirth}
      fullNameError={fullNameError}
      setFullNameError={setFullNameError}
      taxCodeError={taxCodeError}
      setTaxCodeError={setTaxCodeError}
      setFullName={setFullName}
      setTaxCode={setTaxCode}
      fullNameRef={fullNameRef}
      taxCodeRef={taxCodeRef}
      onChangeFullName={onChangeFullName}
      onChangeTaxCode={onChangeTaxCode}
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
      headerArray={headerArray}
      AppTypeData={AppTypeData}
      appTypeValue={appTypeValue}
      handleSetRole={handleSetRole}
      navigation={navigation}
      surname={surname}
      surnameError={surnameError}
      setSurnameError={setSurnameError}
      surnameRef={surnameRef}
      onChangeSurname={onChangeSurname}
      //confirmidentity
      frontSide={frontSide}
      frontImageAdd={frontImageAdd}
      backSide={backSide}
      backImageAdd={backImageAdd}
      onPressFrontSide={pickImage}
      onPressBackSide={pickBackImage}
      IdentityData={IdentityData}
      identityValue={identityValue}
      handleSetIdentity={handleSetIdentity}
    />
  );
};

export default AddFamilyMemberContainer;
