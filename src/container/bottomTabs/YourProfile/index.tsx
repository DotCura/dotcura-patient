import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import YourProfileComponent from '../../../components/bottomTabs/YourProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  activityOpacity,
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
import {
  LoadType,
  usePaginatedList,
} from '../../../global/ApiHelper/usePaginatedList';
import { useDebounce } from '../../../constants/utils/useDebounce';

const YourProfileContainer = ({ navigation }: any) => {
  
  const insets = useSafeAreaInsets();
  const analysisArray = [
    {
      id: '1',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '2',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '3',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '4',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '5',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '6',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
  ];

  const userReport = [
    {
      id: '1',
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
      status: '',
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
      reporttitle: 'Emoglobulina A2',
      reportlastValue: 0.37,
      status: 'Nuovo',
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
      reporttitle: 'Creatininemia',
      reportlastValue: 0.37,
      status: 'Dati non aggiornati',
    },
    {
      id: '4',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Ferritina',
      reportlastValue: 0.37,
      status: 'Nuovo',
    },
  ];

  const appointments = [
    {
      id: '1',
      status: 'waiting',
      orderid: '#121314',
      date: '2025-12-24',
      price: '35.00',
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
    {
      id: '2',
      status: 'waiting',
      orderid: '#121314',
      date: '2025-12-24',
      price: '35.00',
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

  const familyMember = [
    {
      id: '1',
      familymembername: 'Il tuo quadro',
    },
    {
      id: '2',
      familymembername: 'Pasquale',
    },
    {
      id: '3',
      familymembername: 'Maria',
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
    {
      id: 5,
      reportimage: images.imgButterfly,
      totalanalysis: 10,
      currentanalysis: 9,
      testname: 'Tiroide',
    },
    {
      id: 6,
      reportimage: images.imgBlood,
      totalanalysis: 2,
      currentanalysis: 1,
      testname: 'Anemia e sangue',
    },
    {
      id: 7,
      reportimage: images.imgHadi,
      totalanalysis: 25,
      currentanalysis: 2,
      testname: 'Ossa e vitamina D',
    },
    {
      id: 8,
      reportimage: images.imgShield,
      totalanalysis: 14,
      currentanalysis: 7,
      testname: 'Difese immunitarie',
    },
    {
      id: 9,
      reportimage: images.imgFlower,
      totalanalysis: 8,
      currentanalysis: 5,
      testname: 'Ormone donna',
    },
    {
      id: 10,
      reportimage: images.imgMasrrom,
      totalanalysis: 10,
      currentanalysis: 2,
      testname: 'Ormone uomo',
    },
  ];

  const [latestanalysisData, setLatestanalysisData] = useState(analysisArray);
  const [userReportData, setUserReportData] = useState(userReport);
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const [familyMembersData, setFamilyMembersData] = useState(familyMember);
  const [testReportData, setTestReportData] = useState(testReportList);
  const [searchVisible, setSearchVisible] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllTagsBooked, setShowAllTagsBooked] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | number>(
    '0',
  );
  console.log('selectedFamilyId', selectedFamilyId);

  const [showPopup, setShowPopup] = useState(false);
  const [expandedWaiting, setExpandedWaiting] = useState<any>({});
  const [expandedBooked, setExpandedBooked] = useState<any>({});

  const totalStars = 5;
  const limitedData = latestanalysisData.slice(0, 4);
  const modifiedData =
    latestanalysisData.length > 4
      ? [...limitedData, { id: 'see_all', type: 'see_all' }]
      : limitedData;

  const ProgressBarStep = ({ currentStep, totalSteps = 4 }: any) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index <= currentStep && styles.progressStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

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

  const renderItemLatestAnalysis = ({ item, index }: any) => {
    // if (item.type === 'see_all') {
    //   return (
    //     <TouchableOpacity
    //       activeOpacity={activityOpacity}
    //       onPress={handleNavigateOrderHistory}
    //       style={[
    //         styles.vwReportDate,
    //         {
    //           flexDirection: 'row',
    //         },
    //       ]}
    //     >
    //       <Text style={[styles.lblReportName]}>{getTranslation('seeall')}</Text>
    //       <Image source={images.imgRightBlack} />
    //     </TouchableOpacity>
    //   );
    // }
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
        onPress={hanldeNavigateKitAnalysis}
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

  const handlePressProfile = () => {
    // navigation.navigate(ScreenNames.PROFILECONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.PROFILECONTAINER,
    });
  };

  const hanldeNavigateKitAnalysis = () => {
    navigation.navigate(ScreenNames.KITANALYSISCONTAINER);
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
  const [searchHistory, setSeachHistory] = useState('');
  const debouncedSearch = useDebounce(searchHistory, 400);

  //ANALITILIST
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

  //  Add this useEffect to trigger reset when family member changes
  useEffect(() => {
    if (selectedFamilyId !== undefined) {
      AnalitiList.reset();
      orders.reset();
    }
  }, [selectedFamilyId]);

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

  //================= API ==============================

  //FAMILYAPI
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

  return (
    <YourProfileComponent
      insets={insets}
      latestanalysisData={latestanalysisData}
      renderItemLatestAnalysis={renderItemLatestAnalysis}
      modifiedData={orders?.data}
      userReportData={userReportData}
      renderUserReportData={renderUserReportData}
      renderTestReportData={renderTestReportData}
      testReportData={AnalitiList?.data}
      setSearchVisible={setSearchVisible}
      searchVisible={searchVisible}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={appointmentsData}
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
    />
  );
};

export default YourProfileContainer;
