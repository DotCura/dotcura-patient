import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import FavouritesComponent from '../../components/Favourites';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../global/Header';
import {
  activityOpacity,
  currency,
  flashMessageBottomSucess,
  getRandomTheme,
} from '../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { getTags } from 'react-native-device-info';
import { getTranslation } from '../../localization/i18n/i18n.config';
import BarChartComponent from '../../global/BloodCountGraph';
import { ScreenNames } from '../../constants/AppConstants';

const FavouritesContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const kitfavList = [
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
      isTest: true,
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
      isTest: true,
      reportname: 'Profilo Lipidico Completo',
      reportValue: '2.2',
      currentvalue: 100,
      minValue: 1000,
      maxvalue: 10000,
      reportunit: 'pH',
    },
    {
      id: '6',
      isTest: true,
      reportname: 'Profilo Lipidico Completo',
      reportValue: '2.2',
      currentvalue: 11000,
      minValue: 1000,
      maxvalue: 10000,
      reportunit: 'pH',
    },
  ];

  const [kitFavData, setKitFavData] = useState(kitfavList);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const renderFavKitData = ({ item, index }: any) => {
    return (
      <BarChartComponent
        key={index}
        currentValue={item.currentvalue}
        minValue={item.minValue}
        maxValue={item.maxvalue}
        width={ScreenDimensions.screenWidth - getWidth(40)}
        height={getHeight(50)}
        reportName={item.reportname}
        reportValue={item.reportValue}
        reportItem={item}
        onpressreport={handleNavigateTestDetails}
      />
    );
  };

  const handlePressUnfav = () => {
    funCloseDeleteModel();
    flashMessageBottomSucess(getTranslation('unfavmessage'));
  };

  const funOpenDeleteModel = () => {
    setShowDeleteModel(true);
  };

  const funCloseDeleteModel = () => {
    setShowDeleteModel(false);
  };

  const handleNavigateTestDetails = () => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER);
  
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
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

  useEffect(() => {
    header();
  }, []);

  return (
    <FavouritesComponent
      insets={insets}
      navigation={navigation}
      kitFavData={kitFavData}
      renderFavKitData={renderFavKitData}
      showDeleteModel={showDeleteModel}
      funOpenDeleteModel={funOpenDeleteModel}
      funCloseDeleteModel={funCloseDeleteModel}
      handlePressUnfav={handlePressUnfav}
    />
  );
};

export default FavouritesContainer;
