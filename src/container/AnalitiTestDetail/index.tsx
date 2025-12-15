import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnalitiTestDetailComponent from '../../components/AnalitiTestDetail';
import AppHeader from '../../global/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import { ScreenNames } from '../../constants/AppConstants';

const AnalitiTestDetailContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const AnalitiTestdetails = {
    id: '1',
    totalreport: 8,
    currentreport: 7,
    testimage: images.imgHeart,
    kits: [
      {
        kitype: 'kit',
        kitname: 'Diabete',
        kittest: [
          {
            id: '1',
            isTest: true,
            reportname: 'Colesterolo Totale',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '6',
            isTest: true,
            reportname: 'Colesterolo LDL',
            reportValue: '0.37',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '2',
            isTest: true,
            reportname: 'Trigliceridi',
            reportValue: '18',
            currentvalue: 2000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '3',
            isTest: false,
            reportname: 'Coloresterolo HDL',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '4',
            isTest: true,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '18 mg/g',
            currentvalue: 4000,
            minValue: 1000,
            maxvalue: 10000,
          },
          {
            id: '5',
            isTest: false,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '6',
            isTest: false,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
        ],
      },
    ],
    tags: [
      'Urine',
      'Blood sugar',
      'Urine',
      'Blood sugar',
      'Urine',
      'Blood sugar',
    ],
    nurse: {
      nurseid: '1',
      name: 'Federica S.',
      rating: 3,
    },
  };

  const [AnalitiTestDetailsData, setAnalitiTestDetailsData] =
    useState(AnalitiTestdetails);

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  const navigateTestDetailsScreen = () => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER);
  };
  const navigateTestGetTestedScreem = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.GETTESTED,
    });
  };

  useEffect(() => {
    header();
  }, []);
  return (
    <AnalitiTestDetailComponent
      insets={insets}
      AnalitiTestDetailsData={AnalitiTestDetailsData}
      navigateTestDetailsScreen={navigateTestDetailsScreen}
      navigateTestGetTestedScreem={navigateTestGetTestedScreem}
    />
  );
};

export default AnalitiTestDetailContainer;
