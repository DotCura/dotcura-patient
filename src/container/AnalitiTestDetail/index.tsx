import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AnalitiTestDetailComponent from '../../components/AnalitiTestDetail';
import AppHeader from '../../global/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnalitiTestDetailContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
          }}
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
  return <AnalitiTestDetailComponent insets={insets} />;
};

export default AnalitiTestDetailContainer;
