

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
  flashMessageWarning,
  formatDateToSpanish,
} from '../../../constants/GConstant';
import { ScreenNames } from '../../../constants/AppConstants';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from '../../../global/ProgressBar';
import { useFocusEffect } from '@react-navigation/native';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { apiPromise } from '../../../global/ApiHelper/apiPromise';
import { ApiEndPoints, MethodType, StatusCode } from '../../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../../global/ApiHelper/usePaginatedList';
import { APIManager } from '../../../api/APIManager';
import { ZustandStores } from '../../../store';
import { useSocketConnection } from '../../../socket/useSocketConnection';

const HomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const latestAnalysis = [
    {
      id: '1',
      chartData: [
        { value: 0, date: 'Set 23' },
        { value: 800, date: 'Set 24' },
        { value: 600, date: 'Dic 24' },
        { value: 500, date: 'Gen 25' },
        { value: 3000, date: 'Set 25' },
      ],
      maxvalue: 1000,
      minvalue: 100,
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
          currentvalue: 800,
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
          currentvalue: 60,
          minValue: 30,
          maxvalue: 60,
        },
        {
          id: '2',
          isTest: true,
          reportname: 'Urine',
          reportunit: 'pH',
          reportValue: '2.2',
          currentvalue: 0,
          minValue: 0.5,
          maxvalue: 0.7,
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
  const [testReportData, setTestReportData] = useState<any>([]);
  const [recommandAnalysisData, setrecommandAnalysisData] =
    useState(recommandAnalysis);
  const [familyMemberAnalysisData, setFamilyMemberAnalysisData] = useState([]);
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

  const getSeverityByValue = (value: any, min: any, max: any) => {
    const v = Number(value);
    const span = max - min || 1;

    const extendedMax = max + span;
    const extendedMin = min - span;

    if (v > extendedMax) return 'extreme-high';
    if (v < extendedMin) return 'extreme-low';

    if (v > max) return 'moderate-high';
    if (v < min) return 'moderate-low';

    return 'normal';
  };

  const shadowBySeverity = {
    normal: images.imgTopBlueShadow,
    'moderate-high': images.imgYellowShadow,
    'moderate-low': images.imgYellowShadow,
    'extreme-high': images.imgTopRedShadow,
    'extreme-low': images.imgTopRedShadow,
  };

  const renderLatestAnlaysisData = ({ item, index }: any) => {
    const severity = getSeverityByValue(
      item?.latest?.value,
      item?.latest?.minvalue,
      item?.latest?.maxvalue,
    );

    const shadowImage = shadowBySeverity[severity];
    return (
      <TouchableOpacity
        onPress={() => {
          handleNavigateTestDetailsScreenBarChart(item);
        }}
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
        <Image source={shadowImage} style={{ position: 'absolute' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblReportTitle}>{item?.test?.name}</Text>
            <Text style={styles.lblLastValue}>
              {/* {getTranslation('lastvalue')}  */}
              {item?.latest?.value}
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={images.imgRightBlack} />
          </View>
        </View>
        {/* chartView */}
        <VerticalBarChart
          data={item.trend}
          chartMaxValue={item?.latest?.maxvalue}
          chartMinValue={item?.latest?.minvalue}
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
        onPress={() => {
          handleNavigateAnlitiTestDetails(item?.id);
        }}
      >
        <View style={styles.lblTestImage}>
          <Text style={styles.lblTestName} numberOfLines={1}>
            {item?.name}
          </Text>
          <Image
            source={{ uri: item?.kit_image_url }}
            style={{ height: getHeight(30), aspectRatio: 1, borderRadius: 100 }}
          />
        </View>
        <View>
          <Text style={styles.lblTotalAnalysis}>
            <Text style={styles.lblCurrentanalysis}>
              {item.completed_tests}{' '}
            </Text>
            {getTranslation('ditext')} {item.total_tests}{' '}
            {getTranslation('analitietext')}
          </Text>
          <ProgressBar
            current={item.completed_tests}
            total={item.total_tests}
            height={6}
            backgroundColor={Colors.blueEF}
            gradientColors={[Colors.blue00250, Colors.blue002]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigateProfileScreen = () => {
    // navigation.navigate(ScreenNames.PROFILECONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.PROFILECONTAINER,
    });
  };

  const handleNavigateCheckoutScreen = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
  };

  const handleNavigateTestDetailsScreen = (item: any) => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER, {
      test_id: item?.reportDetails?.test_id,
    });
  };

  const handleNavigateTestDetailsScreenBarChart = (item: any) => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER, {
      test_id: item?.test?.id,
    });
  };

  const handleNavigateYourProfileScreen = () => {
    console.log('Navigating to:', ScreenNames.BOTTOMTABNAVIGATION);
    console.log('Screen:', ScreenNames.YOURPROFILECONAINER);
    navigation.jumpTo(ScreenNames.YOURPROFILECONAINER);
  };

  const handleNavigateAnlitiTestDetails = (analiti_id: any) => {
    navigation.navigate(ScreenNames.ANALITITESTDETAILSCONTAINER, {
      analitiId: analiti_id,
    });
  };

  const handleNavigateGetTested = () => {
    navigation.jumpTo(ScreenNames.GETTESTEDCONTAINER);
  };

  //====================== API ============================

  //FETCH FIRST NAME
  const [firstName, setFirstName] = useState('');
  useFocusEffect(
    useCallback(() => {
      MmkvManager.getData(MmkvManager.Keys.userDetails, (value: any) => {
        console.log('checking userdetails', value);
        setFirstName(value?.first_name || '');
      });
      return () => {};
    }, []),
  );

  //ANALITILIST
  const fetchAnalitiList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.HOME.GETANALITILIST,
        method: 'POST',
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data?.analysis_list ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const AnalitiList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchAnalitiList,
  });

  //FAVOURITESLIST
  // ========================== API ==========================

  const fetchFavouritesList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.SETTINGS.GETLIKEREPORTLIST,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data ?? [],
      };
    },
    [navigation],
  );

  const favourites: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFavouritesList,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([favourites.refresh?.(), AnalitiList.refresh?.()]);
      await _familyMemberReportList();
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ FIX: Use selectors
  const cartCount = ZustandStores.CartStore(state => state.cartCount);
  const setCartCount = ZustandStores.CartStore(state => state.setCartCount);
  const setNotificationCount = ZustandStores.CartStore(state => state.setNotificationCount);

  const _totalCount = async () => {
    const params = {};
    try {
      const callback = (responseData: any) => {
        if (responseData.code === 1) {
          const { total_cart_kits, unread_notifications } = responseData.data;

          setCartCount(total_cart_kits);
          setNotificationCount(unread_notifications);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.COUNT.TOTALCOUNT,
        callback,
        showLoader: false,
        params,
      });
    } catch (error) {
      console.log('Count sync error:', error);
    }
  };

  // Api AddressList
  const _familyMemberReportList = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setFamilyMemberAnalysisData(responseData?.data);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.FAMILY.FAMILYMEMBERREPORTDETAILS,
        callback,
        params,
      });
    } catch (error) {
      console.log('FAMILYMEMBERREPORTDETAILS List error:', error);
    }
  };

  useEffect(() => {
    _totalCount();
    _familyMemberReportList();
  }, []);

 

  return (
    <HomeComponent
      insets={insets}
      outdated={outdated}
      latestAnalysisData={favourites?.data}
      renderLatestAnlaysisData={renderLatestAnlaysisData}
      recommandAnalysisData={recommandAnalysisData}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      renderTestReportData={renderTestReportData}
      testReportData={AnalitiList?.data}
      familyMemberAnalysisData={familyMemberAnalysisData}
      handleNavigateProfileScreen={handleNavigateProfileScreen}
      handleNavigateCheckoutScreen={handleNavigateCheckoutScreen}
      handleNavigateTestDetailsScreen={handleNavigateTestDetailsScreen}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={appointmentsData}
      handleNavigateYourProfileScreen={handleNavigateYourProfileScreen}
      handleNavigateGetTested={handleNavigateGetTested}
      firstName={firstName}
      favourites={favourites}
      isloadingshow={AnalitiList.loading == false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      cartCount={cartCount}
    />
  );
};

export default HomeContainer;
