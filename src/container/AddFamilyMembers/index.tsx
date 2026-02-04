import { Keyboard } from 'react-native';
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
import { ScreenNames } from '../../constants/AppConstants';
import { ImagePickerManager } from '../../constants/utils/NativeImagePicker';
import { uploadFile } from '../../global/AWSUploadManager';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';

const AddFamilyMemberContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const isEdit = route?.params?.editFamilyMember === true;
  const editData = route?.params?.editFamilyMemberData;
  const familyMemberId = route?.params?.familyMemberId;

  useEffect(() => {
    if (isEdit && editData) {
      // BASIC DETAILS
      setFullName(editData.first_name || '');
      setSurname(editData.last_name || '');
      setAppTypeValue(editData.relationship_id?.toString());
      setIdentityValue(editData.document_id?.toString());
      setSelectedGender(editData.gender === 'male' ? 1 : 2);
      setTaxCode(editData.tax_code || '');

      // DOB
      if (editData.dob) {
        setFormatedDateForApi(editData.dob);
        setFormattedDate(moment(editData.dob).format('DD/MM/YYYY'));
      }

      // DOCUMENT IMAGES
      setFrontSide(editData.document_front_image);
      setBackSide(editData.document_back_image);
      setFrontImageAdd(true);
      setBackImageAdd(true);

      // 🩺 MEDICAL INFO (MOST IMPORTANT)
      const medicalInfo = editData.medical_info || {};

      setMedicazioni(
        (medicalInfo.M || []).map((item: any) => ({
          id: item.medical_id, // used for submit
          deleteid: item.id, // used for delete API
          name: item.name,
          type: 'M',
        })),
      );

      setAllergie(
        (medicalInfo.A || []).map((item: any) => ({
          id: item.medical_id,
          deleteid: item.id,
          name: item.name,
          type: 'A',
        })),
      );

      setPatologie(
        (medicalInfo.P || []).map((item: any) => ({
          id: item.medical_id,
          deleteid: item.id,
          name: item.name,
          type: 'P',
        })),
      );
    }
  }, [isEdit, editData]);

  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);

  const [fullName, setFullName] = useState<any>('');
  const [surname, setSurname] = useState<any>('');

  const [AppTypeData, setAppTypeData] = useState<
    { label: string; value: string }[]
  >([]);
  const [appTypeValue, setAppTypeValue] = useState<any>('');

  const [IdentityData, setIdentityData] = useState<
    { label: string; value: string }[]
  >([]);
  const [identityValue, setIdentityValue] = useState<any>('');

  const [frontSide, setFrontSide] = useState(undefined);
  const [frontImageAdd, setFrontImageAdd] = useState(false);
  const [frontImageFile, setFrontImageFile] = useState<any>(undefined);

  const [backSide, setBackSide] = useState(undefined);
  const [backImageAdd, setBackImageAdd] = useState(false);
  const [backImageFile, setBackImageFile] = useState<any>(undefined);

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

  const extractS3Key = (urlOrKey: string) => {
    if (!urlOrKey) return '';

    // If already a key (document/xxx.jpg), return as-is
    if (!urlOrKey.startsWith('http')) {
      return urlOrKey;
    }

    // If full URL, extract key after .com/
    const parts = urlOrKey.split('.com/');
    return parts[1] || urlOrKey;
  };

  const uploadImagesIfNeeded = async () => {
    let frontUrl: any = frontSide;
    let backUrl: any = backSide;

    if (frontImageFile) {
      frontUrl = await uploadFile(frontImageFile);
    }

    if (backImageFile) {
      backUrl = await uploadFile(backImageFile);
    }

    return {
      frontUrl: extractS3Key(frontUrl),
      backUrl: extractS3Key(backUrl),
    };
  };

  const handlePressContinue = async () => {
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
      try {
        const { frontUrl, backUrl } = await uploadImagesIfNeeded();

        console.log('Uploaded Front URL:', frontUrl);
        console.log('Uploaded Back URL:', backUrl);

        if (isEdit) {
          await _updateFamilyMemberDetails(frontUrl, backUrl);
        } else {
          await _addFamilyMemberDetails(frontUrl, backUrl);
        }
      } catch (error) {
        console.log(error);
      }
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
      .then(async (result: any) => {
        if (!result) return;

        const uri = result[0]?.uri;
        if (!uri) return;

        // const fileName: any = await uploadFile(result[0]);
        // console.log('Uploaded file name:', fileName);
        // setFrontUrl(fileName);
        // setFrontSide(uri);
        // setFrontImageAdd(true);
        // Store the file object and URI, but don't upload yet
        setFrontImageFile(result[0]);
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
      .then(async (result: any) => {
        if (!result) return;

        const uri = result[0]?.uri;
        if (!uri) return;

        setBackImageFile(result[0]);
        setBackSide(uri);
        setBackImageAdd(true);

        console.log('Front image selected:', uri);
      })
      .catch(error => {
        console.log('🔥 Error in pickImage():', error);
      });
  };

  const removeFrontImage = () => {
    setFrontSide(undefined);
    setFrontImageFile(undefined);
    setFrontImageAdd(false);
  };

  const removeBackImage = () => {
    setBackSide(undefined);
    setBackImageFile(undefined);
    setBackImageAdd(false);
  };

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

  //===================== API ===========================

  //OPENMEDICALMODEL
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

  //HANDLESAVEMEDICALITEM
  const handleSave = async (selected: any[]) => {
    if (modalType === 'patologie') setPatologie(selected);
    if (modalType === 'medicazioni') setMedicazioni(selected);
    if (modalType === 'allergie') setAllergie(selected);
    setModalVisible(false);
  };

  //HANDLEDELETEMEDICALITEM
  const handleDeleteItem = (type: any, id: any) => {
    console.log('id------', id);

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

  //GETMEDICALHISTORY
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

  //GETRELATIONSHIPTYPE
  const _getRelationTypes = async () => {
    try {
      const params = {
        type: 'relationship_type',
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api getrelationshiptype');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const formattedData = responseData?.data?.map((item: any) => ({
            label: item.name, // shown in dropdown
            value: item.id.toString(), // stored value
          }));

          setAppTypeData(formattedData);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.OTHER.GETRELATIONTYPE,
        callback,
        params,
        showLoader: false,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('getrelationshiptype error:', error);
    }
  };

  //GETDOCUMENTTYPE
  const _getDocumentTypes = async () => {
    try {
      const params = {
        type: 'document',
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api _getDocumentTypes');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const formattedData = responseData?.data?.map((item: any) => ({
            label: item.name, // shown in dropdown
            value: item.id.toString(), // stored value
          }));

          setIdentityData(formattedData);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.OTHER.GETRELATIONTYPE,
        callback,
        params,
        showLoader: false,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('_getDocumentTypes error:', error);
    }
  };

  //GETALLMEDICALIDS
  const getAllMedicalIds = () => {
    const patologieIds = patologie.map((i: any) => i.id);
    const medicazioniIds = medicazioni.map((i: any) => i.id);
    const allergieIds = allergie.map((i: any) => i.id);

    return [...medicazioniIds, ...patologieIds, ...allergieIds];
  };

  //ADDFAMILYMEMBERDETAILS
  const _addFamilyMemberDetails = async (frontUrl: string, backUrl: string) => {
    try {
      // 2️⃣ Combine medical IDs
      const detailTypeIds = getAllMedicalIds();
      const params = {
        name: fullName + ' ' + surname,
        first_name: fullName,
        last_name: surname,
        relationship_id: appTypeValue,
        gender: selectedGender == 1 ? 'male' : 'female',
        dob: formatedDateForApi,
        document_id: identityValue,
        document_front_image: frontUrl,
        document_back_image: backUrl,
        tax_code: taxCode,
        detail_type_ids: detailTypeIds,
      };
      console.log('Params for Add Family Member:', params);

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api Add Family Member');
        toggleLoader(false);
        navigation.popTo(ScreenNames.ADDFAMILYCONTAINER);
        if (responseData.code === StatusCode.SUCCESS) {
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.FAMILY.ADDFAMILYMEMBER,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Add Family Member error:', error);
    }
  };

  //UPDATEFAMILYMEMBERDETAILS
  const _updateFamilyMemberDetails = async (
    frontUrl: string,
    backUrl: string,
  ) => {
    try {
      // 2️⃣ Combine medical IDs
      const detailTypeIds = getAllMedicalIds();
      const params = {
        family_member_id: familyMemberId,
        name: fullName + ' ' + surname,
        first_name: fullName,
        last_name: surname,
        relationship_id: appTypeValue,
        gender: selectedGender == 1 ? 'male' : 'female',
        dob: formatedDateForApi,
        document_id: identityValue,
        document_front_image: frontUrl,
        document_back_image: backUrl,
        tax_code: taxCode,
        detail_type_ids: detailTypeIds,
      };
      console.log('Params for update Family Member:', params);

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api Add Family Member');
        toggleLoader(false);
        navigation.popTo(ScreenNames.ADDFAMILYCONTAINER);
        if (responseData.code === StatusCode.SUCCESS) {
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.FAMILY.UPDATEFAMILYMEMBER,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Add Family Member error:', error);
    }
  };

  //REMOVEFAMILYMEMBER
  const _removeFamilyMember = async () => {
    try {
      // 2️⃣ Combine medical IDs
      const detailTypeIds = getAllMedicalIds();
      const params = {
        family_member_id: familyMemberId,
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api Remove Family Member');
        toggleLoader(false);
        navigation.popTo(ScreenNames.ADDFAMILYCONTAINER);
        if (responseData.code === StatusCode.SUCCESS) {
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.FAMILY.DELETEFAMILYMEMBER,
        callback,
        params,
        showLoader: false,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Remove Family Member error:', error);
    }
  };

  //CALLAPI
  useEffect(() => {
    _getRelationTypes();
    _getDocumentTypes();
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
      medicalList={medicalList}
      _getMedicalHistory={_getMedicalHistory}
      isEdit={isEdit}
      _removeFamilyMember={_removeFamilyMember}
      onRemoveFrontImage={removeFrontImage}
      onRemoveBackImage={removeBackImage}
    />
  );
};

export default AddFamilyMemberContainer;
