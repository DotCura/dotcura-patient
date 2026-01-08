import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AddressListComponent from '../../components/AddressList';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { useFocusEffect } from '@react-navigation/native';

const AddressListContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const addressList = [
    {
      id: 1,
      title: getTranslation('yourlocationtitle'),
      subtitle: getTranslation('yourlocationsubtitle'),
    },
    { id: 2, title: 'Home', subtitle: 'Via Roma, 31 – Naples' },
    { id: 3, title: 'Apartment', subtitle: 'Piazzale Napoli, 21 – Rome' },
  ];

  const [AddressData, setAddressData] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onSelectAddress = (item: any) => {
    setSelectedAddress(item);
  };

  const handleOnPressAddAddress = () => {
    navigation.navigate(ScreenNames.ADDADDRESSCONTAINER);
  };

  const handleOnPressEditAddress = (item: any) => {
    navigation.navigate(ScreenNames.ADDADDRESSCONTAINER, {
      editAddressData: item,
      editAddress: true,
    });
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            // navigation.navigate(ScreenNames.PROFILECONTAINER);
            navigation.goBack();
          }}
          centerTitle={getTranslation('addresss')}
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

  // ========================== API ==========================

  // Api AddressList
  const _addressListApi = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        setIsLoading(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const list = responseData.data || [];
          setAddressData(list);

          // ✅ Auto select default address
          const defaultAddress = list.find(
            (item: any) => item.is_default === 1,
          );
          console.log('defaultAddress', defaultAddress);

          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else {
            setSelectedAddress(null);
          }
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.ADDRESS.GETADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Address List error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      _addressListApi();
      return () => {};
    }, [navigation]),
  );

  return (
    <AddressListComponent
      navigation={navigation}
      insets={insets}
      AddressData={AddressData}
      selectedAddress={selectedAddress}
      onSelectAddress={onSelectAddress}
      handleOnPressAddAddress={handleOnPressAddAddress}
      handleOnPressEditAddress={handleOnPressEditAddress}
      isLoading={isLoading}
    />
  );
};

export default AddressListContainer;
