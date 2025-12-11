import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddressListComponent from '../../components/AddressList';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';

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

  const [AddressData, setAddressData] = useState(addressList);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const onSelectAddress = (item: any) => {
    setSelectedAddress(item);
  };

  const handleOnPressAddAddress = () => {
    navigation.navigate(ScreenNames.ADDADDRESSCONTAINER);
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
  return (
    <AddressListComponent
      insets={insets}
      AddressData={AddressData}
      selectedAddress={selectedAddress}
      onSelectAddress={onSelectAddress}
      handleOnPressAddAddress={handleOnPressAddAddress}
    />
  );
};

export default AddressListContainer;
