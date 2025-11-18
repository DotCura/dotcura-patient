import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CompleteAddressComponent from '../../components/CompleteAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CompleteAddressContainer = () => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  return <CompleteAddressComponent insets={insets} headerArray={headerArray} />;
};

export default CompleteAddressContainer;
