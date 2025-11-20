import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ResultOpenUpComponents from '../../components/ResultOpenUp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ResultOpenUpContainers = () => {
  const insets = useSafeAreaInsets();

  return <ResultOpenUpComponents insets={insets} />;
};

export default ResultOpenUpContainers;
