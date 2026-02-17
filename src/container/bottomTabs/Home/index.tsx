import { Image, Text, TouchableOpacity, View } from 'react-native';
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

const HomeContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  // ✅ FIX: Use selectors
  const cartCount = ZustandStores.CartStore(state => state.cartCount);
  const setCartCount = ZustandStores.CartStore(state => state.setCartCount);
  const setNotificationCount = ZustandStores.CartStore(
    state => state.setNotificationCount,
  );

  const shadowBySeverity = {
    normal: images.imgTopBlueShadow,
    'moderate-high': images.imgYellowShadow,
    'moderate-low': images.imgYellowShadow,
    'extreme-high': images.imgTopRedShadow,
    'extreme-low': images.imgTopRedShadow,
  };

  const [refreshing, setRefreshing] = useState(false);
  const [familyMemberAnalysisData, setFamilyMemberAnalysisData] = useState([]);
  const totalStars = 5;

  const [expandedWaiting, setExpandedWaiting] = useState<any>({});
  const [expandedBooked, setExpandedBooked] = useState<any>({});
  
  const [firstName, setFirstName] = useState('');

  const formatKits = (kits: any[]) => {
    if (!kits?.length) return '';

    return kits
      .map(kit => {
        const kitName = kit?.kit?.name ?? '';
        const count = kit?.test_count ?? 0;
        return `${kitName} (${count})`;
      })
      .join(' + ');
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

  const renderItemAppointment = ({ item, index }: any) => {
    const tests = item.all_tests ?? [];
    const hasExtra = tests.length > 2;

    const isExpandedWaiting = expandedWaiting[item.id];
    const visibleTagsAppointment = isExpandedWaiting
      ? tests
      : tests.slice(0, 2);
    const extraCountAppointment = tests.length - 2;

    const isExpandedBooked = expandedBooked[item.id];
    const visibleTagsBooked = isExpandedBooked ? tests : tests.slice(0, 2);
    const extraCountBooked = tests.length - 2;

    return (
      <>
        {(item.agenda_status === 'complete_visit' ||
          item.agenda_status === 'start_delivery' ||
          item.agenda_status === 'complete_delivery' ||
          item.agenda_status === 'ReportPending') && (
          <TouchableOpacity activeOpacity={1} style={styles.btnwaitingview1}>
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
                        {formatDateToSpanish(item.test_date)}
                      </Text>
                      <View
                        style={{
                          marginTop: getHeight(6),
                          marginBottom: getHeight(10),
                        }}
                      >
                        <Text style={styles.lblOrderID}>
                          {getTranslation('orderidlabel')} #{item.booking_id}
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
                    {visibleTagsAppointment.map((tag: any, index: any) => (
                      <View key={index} style={styles.vwBackTagWaiting}>
                        <Text style={styles.lblTag}>{tag}</Text>
                      </View>
                    ))}

                    {!isExpandedWaiting && hasExtra && (
                      <TouchableOpacity
                        style={styles.btnextracount}
                        onPress={() =>
                          setExpandedWaiting((prev: any) => ({
                            ...prev,
                            [item.id]: true,
                          }))
                        }
                      >
                        <Text style={styles.lblTag}>
                          +{extraCountAppointment}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* nurseView */}
                  {item.nurse !== null && (
                    <View style={styles.nurseview}>
                      <Image source={images.imgInjection} />
                      <Text>{item.nurse.name}</Text>

                      <View style={styles.starRow}>
                        {[...Array(totalStars)].map((_, index) => {
                          const isFilled = index < item.rating; // fill up to ratingStar
                          const iconName = isFilled && images.imgStarFill;

                          return <Image key={index} source={iconName} />;
                        })}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {(item.agenda_status == 'Request' ||
          item.agenda_status == 'Accept' ||
          item.agenda_status == 'start_visit' ||
          item.agenda_status == 'arrived') && (
          <TouchableOpacity activeOpacity={1} style={styles.btnBooked}>
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
                    {formatDateToSpanish(item.test_date)}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={images.imgRightBlack}
                      tintColor={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.lblOrderDesBooked}>
                  {item.agenda_status == 'Request'
                    ? getTranslation('ordersentsubtitle')
                    : item.agenda_status == 'Accept'
                    ? getTranslation('visitconfirmsubtitle')
                    : item.agenda_status == 'start_visit'
                    ? getTranslation('minitarrivesubtitle')
                    : item.agenda_status == 'arrived'
                    ? getTranslation('isheresubtitle')
                    : ''}
                </Text>
                <View style={[styles.vwTags, { marginTop: getHeight(10) }]}>
                  {visibleTagsBooked.map((tag: any, index: any) => (
                    <View key={index} style={styles.vwTagBooked}>
                      <Text style={[styles.lblTag, { color: Colors.white }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}

                  {!isExpandedBooked && hasExtra && (
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
                        +{extraCountBooked}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <ProgressBar
              current={
                item.agenda_status == 'Request'
                  ? 1
                  : item.agenda_status == 'Accept'
                  ? 2
                  : item.agenda_status == 'start_visit'
                  ? 3
                  : item.agenda_status == 'arrived'
                  ? 4
                  : 0
              }
              total={4}
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
          data={item?.trend}
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([favourites.refresh?.(), AnalitiList.refresh?.()]);
      await _familyMemberReportList();
    } finally {
      setRefreshing(false);
    }
  };

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
        showLoader:false,
        params,
      });
    } catch (error) {
      console.log('FAMILYMEMBERREPORTDETAILS List error:', error);
    }
  };

  const fetchOrderList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.ORDER.GETORDERHISTORY,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
          status: 'RUNNING',
        },
      });

      return {
        ...res,
        data: res?.data ?? [],
      };
    },
    [navigation],
  );

  const pendingOrder: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchOrderList,
  });

  const _cancleOrderItem = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.ORDER.CANCLEEDITORDER,
        callback,
        params,
      });
    } catch (error) {
      console.log('cancle Edit Order details error:', error);
    }
  };

  useEffect(() => {
    _totalCount();
    _familyMemberReportList();
    _cancleOrderItem();
  }, []);

  useFocusEffect(
    useCallback(() => {
      MmkvManager.getData(MmkvManager.Keys.userDetails, (value: any) => {
        console.log('checking userdetails', value);
        setFirstName(value?.first_name || '');
      });
      return () => {};
    }, []),
  );

  return (
    <HomeComponent
      pendingOrder={pendingOrder}
      insets={insets}
      latestAnalysisData={favourites?.data}
      renderLatestAnlaysisData={renderLatestAnlaysisData}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      renderTestReportData={renderTestReportData}
      testReportData={AnalitiList?.data}
      familyMemberAnalysisData={familyMemberAnalysisData}
      handleNavigateProfileScreen={handleNavigateProfileScreen}
      handleNavigateCheckoutScreen={handleNavigateCheckoutScreen}
      handleNavigateTestDetailsScreen={handleNavigateTestDetailsScreen}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={pendingOrder?.data}
      handleNavigateYourProfileScreen={handleNavigateYourProfileScreen}
      handleNavigateGetTested={handleNavigateGetTested}
      firstName={firstName}
      favourites={favourites}
      isloadingshow={AnalitiList.loading == false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      cartCount={cartCount}
      AnalitiList={AnalitiList}
    />
  );
};

export default HomeContainer;
