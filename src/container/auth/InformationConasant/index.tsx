import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import InformationConasantComponent from '../../../components/auth/InformationConasant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../../constants/AppConstants';

const InformationConasantContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([
    { id: 1 },
    { id: 2 },
  ]);

  const [selectedInfo, setSelectedInfo] = useState(1);

  const handlePressContinue = () => {
    console.log('hy');
    navigation.navigate(ScreenNames.ALLSETCONATINER);
    // navigation.navigate(ScreenNames.ADDCARDCONTAINER);
  };

  return (
    <InformationConasantComponent
      insets={insets}
      headerArray={headerArray}
      selectedInfo={selectedInfo}
      setSelectedInfo={setSelectedInfo}
      handlePressContinue={handlePressContinue}
      navigation={navigation}
    />
  );
};

export default InformationConasantContainer;
