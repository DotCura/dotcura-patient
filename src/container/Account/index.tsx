import { View } from "react-native"
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { flashMessageWarning } from "../../constants/GConstant";
import { ScreenNames } from "../../constants/AppConstants";
import AppHeader from "../../global/Header";
import AccountComponent from "../../components/Account";


const AccountContainer = ({navigation, route}: any) => {
 const insets = useSafeAreaInsets();


  const genders = [
    { id: 1, label: getTranslation('gender1') },
    { id: 2, label: getTranslation('gender2') },
  ];

  const [fullName, setFullName] = useState<any>('');
  console.log(fullName, 'fullName =====');
  
  const [taxCode, setTaxCode] = useState<any>('');
  const [dateOfBirth, setDateOfBirth] = useState<any>('');
  const [selectedGender, setSelectedGender] = useState(1);

  const [fullNameError, setFullNameError] = useState<any>('');
  const [dateError, setDateError] = useState<any>('');
  const [taxCodeError, setTaxCodeError] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [formatedDateForApi, setFormatedDateForApi] = useState("");

  const fullNameRef = useRef<any>(null);
  const taxCodeRef = useRef<any>(null);

  const onChangeFullName = (text: any) => {
    let newText = text.replace(/[0-9]/g, '');
    newText = newText.replace(/^\s+/, '');
    newText = newText.replace(/\s{2,}/g, ' ');
    setFullName(newText);
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
    setTaxCodeError('');

    if (!fullName.trim()) {
      setFullNameError(getTranslation('errorMessageFullNameRequired'));
      return;
    } else if (fullName.trim().length < 2) {
      setFullNameError(getTranslation('errorMessageFullNameTooShort'));
      return;
    } else if (formattedDate == "") {
      flashMessageWarning(getTranslation("pleaseselectdateofbirth"))
      return
    } else if (!taxCode.trim()) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeRequired'));
      return;
    } else if (taxCode.length !== 16) {
      setTaxCodeError(getTranslation('errorMessageTaxCodeValid'));
      return;
    } else {
      console.log('✅ Profile completed successfully');
      if (route?.params?.isFromProfile == true) {
        navigation.pop()
      } else {
      // navigation.navigate(ScreenNames.CONFIRMACCOUNTCONATINER)
      navigation.goBack();
      }
      
      // Proceed to next screen or API call
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
  const formatedDateForApi = moment(date).format("YYYY-MM-DD");
  setFormatedDateForApi(formatedDateForApi);
  console.log(formatedDateForApi);

  // Format for Display (DD/MM/YYYY)
  const formatted = moment(date).format("DD/MM/YYYY");
  setFormattedDate(formatted);
  console.log(formatted);

  hideDatePicker();
};
 
     const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            navigation.pop()
          }}
          centerTitle={getTranslation("account")}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={true}
          isSaveIcon={true}
          onClickSave={handlePressContinue}


        />
      ),
    });
  };

  useEffect(() => {
    header();
  });

return (
  <AccountComponent 
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
      
  />  

)
}

export default AccountContainer