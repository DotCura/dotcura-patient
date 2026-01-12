import { TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AddAddressComponent from '../../components/AddAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import { ScreenNames } from '../../constants/AppConstants';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';

const AddAddressContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  const addressType = [
    { label: getTranslation('addresstypehome'), value: '1' },
    { label: getTranslation('addresstypework'), value: '2' },
    { label: getTranslation('addresstypemedical'), value: '3' },
    { label: getTranslation('addresstypeother'), value: '4' },
  ];

  const [searchAddress, setSearchAddress] = useState('');
  const [searchAddressError, setSearchAddressError] = useState<any>('');

  const [isdefaultsave, setIsDefaultSave] = useState(true);
  const [floor, setFloor] = useState<string>('');
  const [stairs, setStairs] = useState<string>('');
  const [instructions, setinstructions] = useState<string>('');

  const floorRef = useRef<TextInput | null>(null);
  const stairsRef = useRef<TextInput | null>(null);
  const instructionRef = useRef<TextInput | null>(null);

  const [floorError, setFloorError] = useState<any>('');
  const [stairsError, setStairsError] = useState<any>('');
  const [instructionsError, setInstructionNameError] = useState<any>('');

  const [addressTypeData, setAddressTypeData] = useState(addressType);
  const [addressTypeValue, setAddressTypeValue] = useState<string | null>('1');
  const [addressTypeItem, setAddressTypeItem] = useState<string | null>(
    addressTypeData[0].label,
  );

  //EDIT ADDRESS
  const editAddressData = route?.params?.editAddressData;
  const editAddress = route?.params?.editAddress;
  console.log('editAddressData', editAddressData);
  console.log('editAddress', editAddress);

  useEffect(() => {
    if (editAddress && editAddressData) {
      setSearchAddress(editAddressData.address);
      setFloor(editAddressData.floor);
      setStairs(editAddressData.stairs);
      setinstructions(editAddressData.instructions);
      setIsDefaultSave(editAddressData.is_default === 1 ? true : false);

      const selectedType = addressType.find(
        item => item.label === editAddressData.title,
      );
      if (selectedType) {
        setAddressTypeValue(selectedType.value);
        setAddressTypeItem(selectedType.label);
      }
    }
  }, [editAddress, editAddressData]);

  const handleSetAddressType = (item: any) => {
    setAddressTypeValue(item.value);
    setAddressTypeItem(item.label);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'floor') {
      // Only numbers
      let newText = text.replace(/[^\d]/g, '');
      setFloor(newText);
    } else if (type === 'stairs') {
      // Only alphabet letters
      let newText = text.replace(/[^a-zA-Z]/g, '');
      setStairs(newText);
    } else if (type === 'instruction') {
      // Free text, only remove extra spaces at start
      let newText = text.replace(/^\s+/, '');
      setinstructions(newText);
    }
  };

  const handleOnPressSaveAddress = async () => {
    // if (searchAddress.trim() === '') {
    //   flashMessageWarning(getTranslation('emptysearchaddress'));
    //   return;
    // } else
    if (floor.trim() === '') {
      setFloorError(getTranslation('emptyFloor'));
      return;
    } else if (!/^\d+$/.test(floor)) {
      setFloorError(getTranslation('invalidFloor'));
      return;
    } else if (stairs.trim() === '') {
      setStairsError(getTranslation('emptyStairs'));
      return;
    } else if (!/^[A-Za-z]+$/.test(stairs)) {
      setFloorError(getTranslation('invalidStairs'));
      return;
    }

    // INSTRUCTION VALIDATION (optional, no limit)
    else if (instructions.trim() == '') {
      setInstructionNameError(getTranslation('emptyInstructions'));
      return;
    } else {
      if (editAddress === true) {
        await _updateAddressApi();
        return;
      } else {
        await _addAddressApi();
        return;
      }
    }
  };

  const handleOnPressCancleAddress = () => {
    navigation.goBack();
  };

  const handleOnPressDeleteAddress = async () => {
    await _deleteAddressApi();
  };

  const searchRef = useRef<any>(null);

  const handlePlaceSelect = async (place: any) => {
    console.log('call', place);
    if (place && place.placeId) {
      console.log('Selected place:', JSON.stringify(place));
      console.log("place?.text?.text",place?.text?.text);
      
      // searchRef.current?.clear();
      setSearchAddress(place?.text?.text);
      // setSearchText("");
    }
  };

  const toggleisDefault = () => {
    setIsDefaultSave(!isdefaultsave);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          centerTitle={getTranslation('addresss')}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //======================API============================

  const _addAddressApi = async () => {
    try {
      const params = {
        address: searchAddress,
        title: addressTypeItem,
        floor: floor,
        stairs: stairs,
        instructions: instructions,
        latitude: '0',
        longitude: '0',
        is_default: isdefaultsave == true ? 1 : 0,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          navigation.popTo(ScreenNames.ADDRESSLISTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.ADDADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Add Address error:', error);
    }
  };

  const _updateAddressApi = async () => {
    try {
      const params = {
        address_id: editAddressData.address_id,
        address: searchAddress,
        title: addressTypeItem,
        floor: floor,
        stairs: stairs,
        instructions: instructions,
        latitude: '0',
        longitude: '0',
        is_default: isdefaultsave == true ? 1 : 0,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          navigation.popTo(ScreenNames.ADDRESSLISTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.UPDATEADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Add Address error:', error);
    }
  };

  const _deleteAddressApi = async () => {
    try {
      const params = {
        address_id: editAddressData.address_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          navigation.popTo(ScreenNames.ADDRESSLISTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.REMOVEADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Remove Address error:', error);
    }
  };

  return (
    <AddAddressComponent
      navigation={navigation}
      insets={insets}
      headerArray={headerArray}
      searchRef={searchRef}
      handlePlaceSelect={handlePlaceSelect}
      handleOnPressSaveAddress={handleOnPressSaveAddress}
      handleOnChangeText={handleOnChangeText}
      floor={floor}
      stairs={stairs}
      instructions={instructions}
      floorRef={floorRef}
      stairsRef={stairsRef}
      instructionRef={instructionRef}
      floorError={floorError}
      setFloorError={setFloorError}
      stairsError={stairsError}
      setStairsError={setStairsError}
      instructionsError={instructionsError}
      setInstructionNameError={setInstructionNameError}
      toggleisDefault={toggleisDefault}
      isdefaultsave={isdefaultsave}
      setAddressTypeValue={setAddressTypeValue}
      addressTypeValue={addressTypeValue}
      addressTypeData={addressTypeData}
      handleSetAddressType={handleSetAddressType}
      searchAddress={searchAddress}
      setSearchAddress={setSearchAddress}
      searchAddressError={searchAddressError}
      setSearchAddressError={setSearchAddressError}
      editAddress={editAddress}
      handleOnPressCancleAddress={handleOnPressCancleAddress}
      handleOnPressDeleteAddress={handleOnPressDeleteAddress}
    />
  );
};

export default AddAddressContainer;
