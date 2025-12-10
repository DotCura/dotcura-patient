import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import HomeComponent from '../../../components/bottomTabs/Home';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { images } from '../../../constants/Images';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import VerticalBarChart from '../../../global/VerticalBarChartHome';
import {
  activityOpacity,
  currency,
  formatDateToSpanish,
} from '../../../constants/GConstant';
import { ScreenNames } from '../../../constants/AppConstants';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from '../../../global/ProgressBar';

const HomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const latestAnalysis = [
    {
      id: '1',
      chartData: [
        { value: 0, date: 'Set 23' },
        { value: 0.4, date: 'Set 24' },
        { value: 0, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 1, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
    {
      id: '2',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
    },
    {
      id: '3',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
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
          isTest: true,
          reportname: 'Urine',
          reportunit: 'pH',
          reportValue: '2.2',
          currentvalue: 1000,
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
          isTest: true,
          reportname: 'Glicemia',
          reportunit: 'mg/dL',
          reportValue: '0.37',
          currentvalue: 20000,
          minValue: 1000,
          maxvalue: 10000,
        },
        {
          id: '2',
          isTest: true,
          reportname: 'Urine',
          reportunit: 'pH',
          reportValue: '2.2',
          currentvalue: 0,
          minValue: 1000,
          maxvalue: 10000,
        },
      ],
    },
  ];

  const testReportList = [
    {
      id: 1,
      reportimage: images.imgHeart,
      totalanalysis: 22,
      currentanalysis: 17,
      testname: 'Cuore',
    },
    {
      id: 2,
      reportimage: images.imgKidney,
      totalanalysis: 22,
      currentanalysis: 0,
      testname: 'Reni',
    },
    {
      id: 3,
      reportimage: images.imgSoda,
      totalanalysis: 22,
      currentanalysis: 12,
      testname: 'Fegato',
    },
    {
      id: 4,
      reportimage: images.imgLolipop,
      totalanalysis: 22,
      currentanalysis: 18,
      testname: 'Diabete',
    },
  ];

  const appointments = [
    {
      id: '3',
      status: 'booked',
      orderid: '#121314',
      date: '2025-12-24',
      appointmentMessage:
        'The appointment is confirmed for Wednesday 10/8 by 10:00',
      price: '35.00',
      time: '10:00',
      dayname: 'Wednesday',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              id: '1',
              reportname: 'Urine',
              reportValue: '2.2',
              currentvalue: 11000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'pH',
            },
            {
              id: '1',
              reportname: 'Emoglobina glicata',
              reportValue: '0.37',
              currentvalue: 11000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'mg/g',
            },
            {
              id: '2',
              reportname: 'Microalbuminuria',
              reportValue: '18',
              currentvalue: 2000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'mg/g',
            },
            {
              id: '3',
              reportname: 'Urine',
              reportValue: '2.2',
              currentvalue: 100,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'pH',
            },
            {
              id: '4',
              reportname: 'Creatininemia',
              reportValue: '18 mg/g',
              currentvalue: 4000,
              minValue: 1000,
              maxvalue: 10000,
            },
            {
              id: '5',
              reportname: 'Urine',
              reportValue: '2.2',
              currentvalue: 100,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'pH',
            },
            {
              id: '6',
              reportname: 'Urine',
              reportValue: '2.2',
              currentvalue: 11000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'pH',
            },
          ],
        },
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              id: '1',
              reportname: 'Urine',
              reportValue: '2.2',
              currentvalue: 11000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'pH',
            },
            {
              id: '2',
              reportname: 'Microalbuminuria',
              reportValue: '18',
              currentvalue: 2000,
              minValue: 1000,
              maxvalue: 10000,
              reportunit: 'mg/g',
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
    },
  ];

  const [outdated, setOutdated] = useState(true);
  const [latestAnalysisData, setLatestAnalysisData] = useState(latestAnalysis);
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const [testReportData, setTestReportData] = useState(testReportList);
  const [recommandAnalysisData, setrecommandAnalysisData] =
    useState(recommandAnalysis);
  const [familyMemberAnalysisData, setFamilyMemberAnalysisData] =
    useState(familyMemberAnalysis);
  const totalStars = 5;

  const [expandedWaiting, setExpandedWaiting] = useState<any>({});
  const [expandedBooked, setExpandedBooked] = useState<any>({});

  const formatKits = (kits: any[]) => {
    return kits
      .map(item => {
        const kitName = item?.kitname || '';
        const count = item?.kittest?.length || 0;
        const label =
          item.kitype === 'kit' ? getTranslation('kitlabeltextcheckout') : '';
        return `${label}${kitName} (${count})`;
      })
      .join(' , ');
  };

  const renderItemAppointment = ({ item, index }: any) => {
    const isExpanded = expandedWaiting[item.id]; // for waiting items
    const isExpandedBooked = expandedBooked[item.id]; // for booked items

    const visibleTags = isExpanded ? item.tags : item.tags.slice(0, 2);
    const extraCount = item.tags.length - 2;

    const visibleTagsAppoint = isExpandedBooked
      ? item.tags
      : item.tags.slice(0, 2);
    const extraCountAppoint = item.tags.length - 2;
    return (
      <>
        {item.status === 'waiting' && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={styles.btnwaitingview1}
          >
            <View style={styles.btnwaitingview2}>
              <View style={styles.btnwaitingview3}>
                <Image source={images.imgkit7} style={styles.imgkit} />
                <View style={{ flex: 1 }}>
                  {/* orderDetailsView */}
                  <View style={styles.vwMainOrderDetails}>
                    <View style={{ flex: 1, gap: getHeight(2) }}>
                      <Text style={styles.lblOrderTitle}>
                        {' '}
                        {getTranslation('analsisOf')}{' '}
                        {formatDateToSpanish(item.date)}
                      </Text>
                      <View
                        style={{
                          marginTop: getHeight(6),
                          marginBottom: getHeight(10),
                        }}
                      >
                        <Text style={styles.lblOrderID}>
                          {getTranslation('orderidlabel')} {item.orderid}
                        </Text>
                        <Text style={styles.lblKitsandAnaliti}>
                          {formatKits(item.kits)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Image source={images.imgRightBlack} />
                    </TouchableOpacity>
                  </View>
                  {/* tags */}
                  <View style={styles.vwTags}>
                    {visibleTags.map((tag: any, index: any) => (
                      <View key={index} style={styles.vwBackTagWaiting}>
                        <Text style={styles.lblTag}>{tag}</Text>
                      </View>
                    ))}

                    {!isExpanded && extraCount > 0 && (
                      <TouchableOpacity
                        style={styles.btnextracount}
                        onPress={() =>
                          setExpandedWaiting((prev: any) => ({
                            ...prev,
                            [item.id]: true,
                          }))
                        }
                      >
                        <Text style={styles.lblTag}>+{extraCount}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* nurseView */}
                  <View style={styles.nurseview}>
                    <Image source={images.imgInjection} />
                    <Text>{item.nurse.name}</Text>

                    <View style={styles.starRow}>
                      {[...Array(totalStars)].map((_, index) => {
                        const isFilled = index < item.nurse.rating; // fill up to ratingStar
                        const iconName = isFilled && images.imgStarFill;

                        return <Image key={index} source={iconName} />;
                      })}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {item.status === 'booked' && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={styles.btnBooked}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: getWidth(10),
                marginBottom: getHeight(12),
              }}
            >
              <Image source={images.imgkit7} style={styles.imgkit} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.lblOrderTitleBooked}>
                    {getTranslation('analsisOf')}{' '}
                    {formatDateToSpanish(item.date)}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={images.imgRightBlack}
                      tintColor={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.lblOrderDesBooked}>
                  {item.appointmentMessage}
                </Text>
                <View style={[styles.vwTags, { marginTop: getHeight(10) }]}>
                  {visibleTagsAppoint.map((tag: any, index: any) => (
                    <View key={index} style={styles.vwTagBooked}>
                      <Text style={[styles.lblTag, { color: Colors.white }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}

                  {!isExpandedBooked && extraCountAppoint > 0 && (
                    <TouchableOpacity
                      style={styles.btnBookedExtraCount}
                      onPress={() =>
                        setExpandedBooked((prev: any) => ({
                          ...prev,
                          [item.id]: true,
                        }))
                      }
                    >
                      <Text style={[styles.lblTag, { color: Colors.white }]}>
                        +{extraCountAppoint}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <ProgressBar
              current={50}
              total={100}
              height={6}
              backgroundColor={Colors.grey9224}
              gradientColors={[Colors.blue00250, Colors.blue3C78]}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderLatestAnlaysisData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={handleNavigateTestDetailsScreen}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth * 0.85,
          backgroundColor: Colors.white,
          borderRadius: 20,
          padding: 16,
          gap: getHeight(6),
          overflow: 'hidden',
        }}
      >
        <Image
          source={images.imgYellowShadow}
          style={{ position: 'absolute' }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblReportTitle}>{item.reporttitle}</Text>
            <Text style={styles.lblLastValue}>
              {/* {getTranslation('lastvalue')}  */}
              {item.reportlastValue}
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

  const renderTestReportData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnTestReport}
        onPress={handleNavigateAnlitiTestDetails}
      >
        <View style={styles.lblTestImage}>
          <Text style={styles.lblTestName} numberOfLines={1}>
            {item.testname}
          </Text>
          <Image source={item.reportimage} />
        </View>
        <View>
          <Text style={styles.lblTotalAnalysis}>
            <Text style={styles.lblCurrentanalysis}>
              {item.currentanalysis}{' '}
            </Text>
            {getTranslation('ditext')} {item.totalanalysis}{' '}
            {getTranslation('analitietext')}
          </Text>
          <ProgressBar
            current={item.currentanalysis}
            total={item.totalanalysis}
            height={6}
            backgroundColor={Colors.blueEF}
            gradientColors={[Colors.blue00250, Colors.blue002]}
          />
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

  const handleNavigateYourProfileScreen = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.YOURPROFILECONAINER,
    });
  };

  const handleNavigateAnlitiTestDetails = () => {
    navigation.navigate(ScreenNames.ANALITITESTDETAILSCONTAINER);
  };

  const handleNavigateGetTested = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.GETTESTEDCONTAINER,
    });
  };

  return (
    <HomeComponent
      insets={insets}
      outdated={outdated}
      latestAnalysisData={latestAnalysisData}
      renderLatestAnlaysisData={renderLatestAnlaysisData}
      recommandAnalysisData={recommandAnalysisData}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      renderTestReportData={renderTestReportData}
      testReportData={testReportData}
      familyMemberAnalysisData={familyMemberAnalysisData}
      handleNavigateProfileScreen={handleNavigateProfileScreen}
      handleNavigateCheckoutScreen={handleNavigateCheckoutScreen}
      handleNavigateTestDetailsScreen={handleNavigateTestDetailsScreen}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={appointmentsData}
      handleNavigateYourProfileScreen={handleNavigateYourProfileScreen}
      handleNavigateGetTested={handleNavigateGetTested}
    />
  );
};

export default HomeContainer;
