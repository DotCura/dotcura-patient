import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import YourProfileComponent from '../../../components/bottomTabs/YourProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  activityOpacity,
  flashMessageWarning,
  formatDateToSpanish,
} from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { images } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import VerticalBarChartProfile from '../../../global/VerticalBarChartProfile';
import { ScreenNames } from '../../../constants/AppConstants';
import ProgressBar from '../../../global/ProgressBar';
import { apiPromise } from '../../../global/ApiHelper/apiPromise';
import { ApiEndPoints } from '../../../api/APIConstant';
import { usePaginatedList } from '../../../global/ApiHelper/usePaginatedList';
import { useDebounce } from '../../../constants/utils/useDebounce';

const YourProfileContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchHistory, setSeachHistory] = useState('');
  const debouncedSearch = useDebounce(searchHistory, 400);

  const [selectedFamilyId, setSelectedFamilyId] = useState<string | number>(
    '0',
  );
  const [showPopup, setShowPopup] = useState(false);

  const [expandedWaiting, setExpandedWaiting] = useState<any>({});
  const [expandedBooked, setExpandedBooked] = useState<any>({});

  const totalStars = 5;

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

  const renderItemLatestAnalysis = ({ item, index }: any) => {
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
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        key={index}
        style={styles.vwReportDate}
        onPress={() => {
          if (item?.is_report_available === false) {
            flashMessageWarning(getTranslation('reportnotavailableprofile'));
          } else {
            hanldeNavigateKitAnalysis(item?.booking_id);
          }
        }}
      >
        <View style={styles.vwLightBlue}></View>
        <View>
          <Text style={styles.lblDateyear}>
            {getTranslation('analsisOf')}
            {formatDateToSpanish(item.test_date)}
          </Text>
          <Text style={styles.lblKitAndTestName} numberOfLines={2}>
            {formatKits(item.kits)}
          </Text>
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
          handleNavigateAnalitiTestDetails(item?.id);
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

  const renderUserReportData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          borderWidth: 2,
          borderColor: Colors.grayED,
          borderRadius: 20,
          padding: 16,
          gap: getHeight(6),
          marginHorizontal: getWidth(16),
        }}
        onPress={() => {
          navigation.navigate(ScreenNames.TESTDETAILSCONTAINER);
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblReportTitle}>{item.reporttitle}</Text>
            <Text style={styles.lblLastValue}>
              {getTranslation('lastvalue')} {item.reportlastValue}
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: getWidth(8),
            }}
          >
            {item.status && (
              <View style={styles.vwstatusReport}>
                <Text style={styles.lblStatus}>{item.status}</Text>
              </View>
            )}
            <Image source={images.imgRightBlack} />
          </View>
        </View>
        {/* chartView */}
        <VerticalBarChartProfile
          data={item.chartData}
          chartMaxValue={item.maxvalue}
          chartMinValue={item.minvalue}
        />
      </TouchableOpacity>
    );
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

  const handlePressProfile = () => {
    // navigation.navigate(ScreenNames.PROFILECONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.PROFILECONTAINER,
    });
  };

  const hanldeNavigateKitAnalysis = (booking_order_id: any) => {
    navigation.navigate(ScreenNames.KITANALYSISCONTAINER, {
      booking_id: booking_order_id,
    });
  };

  const handleNavigateHistoricalAnlysis = () => {
    // navigation.navigate(ScreenNames.HISTORICALANALYSISCONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.HISTORICALANALYSISCONTAINER,
      params: {
        family_memeber_id: selectedFamilyId,
      },
    });
  };

  const handleNavigateAnalitiTestDetails = (analiti_id: any) => {
    navigation.navigate(ScreenNames.ANALITITESTDETAILSCONTAINER, {
      analitiId: analiti_id,
    });
  };

  // ====================== API ===============================

  const fetchAnalitiList = useCallback(
    async ({
      page,
      searchQuery,
      loadType,
      additionalParams,
    }: {
      page: number;
      loadType: any;
      searchQuery?: string;
      additionalParams?: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.HOME.GETANALITILIST,
        method: 'POST',
        showLoader: false,
        params: {
          page,
          ...(searchQuery ? { search: searchQuery } : {}),
          ...additionalParams, // ✅ Spread additional params
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
    searchQuery: debouncedSearch,
    additionalParams: { family_member_id: selectedFamilyId }, // ✅ Pass it here
    fetcher: fetchAnalitiList,
  });

  const fetchOrderList = useCallback(
    async ({
      page,
      loadType,
      additionalParams,
    }: {
      page: number;
      loadType: any;
      additionalParams?: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.ORDER.GETORDERHISTORY,
        method: 'POST',
        showLoader: false,
        params: {
          page,
          payment_status: 'unpaid',
          ...additionalParams,
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

  const orders: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    additionalParams: { family_id: selectedFamilyId }, // ✅ Pass it here
    fetcher: fetchOrderList,
  });

  const fetchPendingOrderList = useCallback(
    async ({
      page,
      loadType,
      additionalParams,
    }: {
      page: number;
      loadType: any;
      additionalParams?: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.ORDER.GETORDERHISTORY,
        method: 'POST',
        showLoader: false,
        params: {
          page,
          status: 'RUNNING',
          ...additionalParams,
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

  const pendingOrder: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    additionalParams: { family_id: selectedFamilyId }, // ✅ Pass it here
    fetcher: fetchPendingOrderList,
  });

  const fetchFamilyMemberList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.FAMILY.GETFAMILYMEMBERLIST,
        method: 'POST',
        showLoader: false,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE

      const formattedData = res?.data;

      // ➕ add "Tu" manually at top
      const finalList = [
        {
          relationship_name: getTranslation('youtextyourprofile'),
          id: '0',
        },
        ...formattedData,
      ];
      return {
        ...res,
        data: finalList ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const familyMemberList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFamilyMemberList,
  });

  useEffect(() => {
    if (selectedFamilyId !== undefined) {
      AnalitiList.reset();
      orders.reset();
      pendingOrder.reset();
    }
  }, [selectedFamilyId]);

  const handleRefresh = () => {
    AnalitiList.refresh();
    familyMemberList.refresh();
    pendingOrder.refresh();
  };

  return (
    <YourProfileComponent
      handleRefresh={handleRefresh}
      pendingOrder={pendingOrder}
      insets={insets}
      renderItemLatestAnalysis={renderItemLatestAnalysis}
      modifiedData={orders?.data}
      renderUserReportData={renderUserReportData}
      renderTestReportData={renderTestReportData}
      testReportData={AnalitiList?.data}
      setSearchVisible={setSearchVisible}
      searchVisible={searchVisible}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={pendingOrder?.data}
      familyMembersData={familyMemberList?.data}
      selectedFamilyId={selectedFamilyId}
      setSelectedFamilyId={setSelectedFamilyId}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      handlePressProfile={handlePressProfile}
      handleNavigateHistoricalAnlysis={handleNavigateHistoricalAnlysis}
      hanldeNavigateKitAnalysis={hanldeNavigateKitAnalysis}
      AnalitiList={AnalitiList}
      searchHistory={searchHistory}
      setSeachHistory={setSeachHistory}
      orders={orders}
      familyMemberList={familyMemberList}
    />
  );
};

export default YourProfileContainer;
