import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import YourProfileComponent from '../../../components/bottomTabs/YourProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const YourProfileContainer = () => {
  const insets = useSafeAreaInsets();
  return <YourProfileComponent insets={insets} />;
};

export default YourProfileContainer;
