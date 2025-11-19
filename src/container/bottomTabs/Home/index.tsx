import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import HomeComponent from '../../../components/bottomTabs/Home';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { images } from '../../../constants/Images';
import {
  getHeight,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import VerticalBarChart from '../../../global/VerticalBarChartHome';
import { activityOpacity, currency } from '../../../constants/GConstant';
import { ScreenNames } from '../../../constants/AppConstants';

const HomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const latestAnalysis = [
    {
      id: '1',
      chartData: [
        { value: 1800, date: 'Set 23', color: Colors.goldenCA },
        { value: 0.14, date: 'Set 24', color: Colors.redCA },
        { value: 0.1, date: 'Dic 24', color: Colors.goldenCA },
        { value: 0.26, date: 'Gen 25', color: Colors.goldenCA },
        { value: 0.37, date: 'Set 25', color: Colors.goldenCA },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
    {
      id: '2',
      chartData: [
        { value: 1800, date: 'Set 23', color: '#D4A928' },
        { value: 0.14, date: 'Set 24', color: '#E53E3E' },
        { value: 0.1, date: 'Dic 24', color: '#D4A928' },
        { value: 0.26, date: 'Gen 25', color: '#D4A928' },
        { value: 0.37, date: 'Set 25', color: '#D4A928' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
    {
      id: '3',
      chartData: [
        { value: 1800, date: 'Set 23', color: '#D4A928' },
        { value: 0.14, date: 'Set 24', color: '#E53E3E' },
        { value: 0.1, date: 'Dic 24', color: '#D4A928' },
        { value: 0.26, date: 'Gen 25', color: '#D4A928' },
        { value: 0.37, date: 'Set 25', color: '#D4A928' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
    {
      id: '4',
      chartData: [
        { value: 1800, date: 'Set 23', color: '#D4A928' },
        { value: 0.14, date: 'Set 24', color: '#E53E3E' },
        { value: 0.1, date: 'Dic 24', color: '#D4A928' },
        { value: 0.26, date: 'Gen 25', color: '#D4A928' },
        { value: 0.37, date: 'Set 25', color: '#D4A928' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
  ];

  const recommandAnalysis = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '3',
      title: 'Colesterolo',
      description: 'Controllo colesterolo totale e HDL',
      price: '40.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
    },
  ];

  const familyMemberAnalysis = [
    {
      id: '1',
      familyMemberName: 'Maria',
      familyMemberReport: [
        {
          id: '1',
          reportname: 'Urine',
          reportValue: 'pH: 2.2',
          currentvalue: 11000,
          minValue: 1000,
          maxvalue: 10000,
        },
      ],
    },
    {
      id: '2',
      familyMemberName: 'Pasquale',
      familyMemberReport: [
        {
          id: '1',
          reportname: 'Urine',
          reportValue: 'pH: 2.2',
          currentvalue: 2000,
          minValue: 1000,
          maxvalue: 10000,
        },
        {
          id: '2',
          reportname: 'Urine',
          reportValue: 'pH: 2.2',
          currentvalue: 1,
          minValue: 1000,
          maxvalue: 10000,
        },
      ],
    },
  ];

  const [outdated, setOutdated] = useState(true);
  const [latestAnalysisData, setLatestAnalysisData] = useState(latestAnalysis);
  const [recommandAnalysisData, setrecommandAnalysisData] =
    useState(recommandAnalysis);
  const [familyMemberAnalysisData, setFamilyMemberAnalysisData] =
    useState(familyMemberAnalysis);

  const renderLatestAnlaysisData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={handleNavigateTestDetailsScreen}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth * 0.75,
          borderWidth: 2,
          borderColor: Colors.grayED,
          borderRadius: 20,
          padding: 16,
          gap: getHeight(6),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblReportTitle}>{item.reporttitle}</Text>
            <Text style={styles.lblLastValue}>
              {getTranslation('lastvalue')} {item.reportlastValue}
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={images.imgRightBlack} />
          </View>
        </View>
        {/* chartView */}
        <VerticalBarChart
          data={item.chartData}
          chartMaxValue={item.maxvalue}
          chartMinValue={item.minvalue}
          navigation={navigation}
        />
      </TouchableOpacity>
    );
  };

  const renderRecommandAnlaysisData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth * 0.4,
          borderRadius: 20,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <View style={styles.vwGrey}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity>
          </View>

          {/* veProductDetails */}
          <View>
            <Text style={styles.lblPrice} numberOfLines={1}>
              {currency}
              {item.price}
            </Text>
            <Text style={styles.lblTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lblDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigateProfileScreen = () => {
    navigation.navigate(ScreenNames.PROFILECONTAINER);
  };
  const handleNavigateCheckoutScreen = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
  };

  const handleNavigateTestDetailsScreen = () => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER);
  };

  return (
    <HomeComponent
      insets={insets}
      outdated={outdated}
      latestAnalysisData={latestAnalysisData}
      renderLatestAnlaysisData={renderLatestAnlaysisData}
      recommandAnalysisData={recommandAnalysisData}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      familyMemberAnalysisData={familyMemberAnalysisData}
      handleNavigateProfileScreen={handleNavigateProfileScreen}
      handleNavigateCheckoutScreen={handleNavigateCheckoutScreen}
      handleNavigateTestDetailsScreen={handleNavigateTestDetailsScreen}
    />
  );
};

export default HomeContainer;
