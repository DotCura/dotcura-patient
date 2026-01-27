import React, { useCallback, useEffect, useState } from 'react';
import OrderHistoryComponent from '../../components/HistoricalAnalysis';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  activityOpacity,
  formatDateToSpanish,
} from '../../constants/GConstant';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { ScreenNames } from '../../constants/AppConstants';
import HistoricalAnalysisComponent from '../../components/HistoricalAnalysis';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import { ApiEndPoints } from '../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

const HistoricalAnalysisContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const historicalanalysis = [
    {
      id: '1',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
          ],
        },
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
    {
      id: '2',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
    {
      id: '3',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
          ],
        },
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
    {
      id: '4',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
          ],
        },
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
    {
      id: '5',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
    {
      id: '6',
      orderid: '#121314',
      date: '2025-12-24',
      kits: [
        {
          kitype: 'kit',
          kitname: 'Diabete',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
            },
          ],
        },
        {
          kitype: 'analiti',
          kitname: 'Cuore',
          kittest: [
            {
              testname: 'Glicemia',
            },
            {
              testname: 'Glicemia',
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
        name: 'Federica S.',
        rating: 3,
      },
    },
  ];

  const [historicalanalysisData, setHistoricalanalysisData] =
    useState(historicalanalysis);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const totalStars = 5;

  const formatKits = (kits: any[]) => {
    return kits
      .map(item => {
        const kitName = item?.kitname || '';
        const count = item?.kittest?.length || 0;
        const label =
          item.kitype === 'kit' ? getTranslation('kitlabeltextcheckout') : '';
        return `${label}${kitName} (${count})`;
      })
      .join(' + ');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Request':
        return {
          label: 'Requested',
          bg: '#FFF8E1',
          text: '#F9A825',
        };

      case 'Accept':
        return {
          label: 'Accepted',
          bg: '#E3F2FD',
          text: '#1976D2',
        };

      case 'Cancel':
        return {
          label: 'Cancelled',
          bg: '#FFE5E5',
          text: '#D32F2F',
        };

      case 'Reject':
        return {
          label: 'Rejected',
          bg: '#FCE4EC',
          text: '#C2185B',
        };

      case 'Completed':
        return {
          label: 'Completed',
          bg: '#E8F5E9',
          text: '#2E7D32',
        };

      case 'ReportPending':
        return {
          label: 'Report Pending',
          bg: '#E1F5FE',
          text: '#0288D1',
        };

      case 'Modified':
        return {
          label: 'Modified',
          bg: '#F3E5F5',
          text: '#7B1FA2',
        };

      default:
        return {
          label: status ?? 'Unknown',
          bg: '#EEEEEE',
          text: '#616161',
        };
    }
  };

  const renderItemHistoricalAnalisis = ({ item, index }: any) => {
    const isExpanded = expandedItems.includes(index);
    const tests = item.all_tests ?? [];
    const visibleTags = isExpanded ? tests : tests.slice(0, 2);
    const extraCount = tests.length - 2;
    const statusStyle = getStatusStyle(item?.status);
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnOrderHistory}
        onPress={() => {
          navigation.navigate(ScreenNames.KITANALYSISCONTAINER);
        }}
      >
        {/* orderDetailsView */}
        <View style={styles.vwMainOrderDetails}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblOrderTitle}>
              {getTranslation('analsisOf')}
              {formatDateToSpanish(item.test_date)}
            </Text>
            <Text style={styles.lblOrderID}>
              {getTranslation('orderidlabel')} #{item.booking_number}
            </Text>
            <Text style={styles.kitandtestdetails}>
              {formatKits(item.kits)}
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={images.imgRightBlack} />
          </TouchableOpacity>
        </View>
        <View style={styles.vwTagMain}>
          {visibleTags.map((test: string, idx: number) => (
            <View key={idx} style={styles.vwTagInner}>
              <Text style={styles.lblTag}>{test}</Text>
            </View>
          ))}

          {/* Show +count only when collapsed */}
          {!isExpanded && extraCount > 0 && (
            <TouchableOpacity
              onPress={() => {
                setExpandedItems(prev => [...prev, index]); // add index to expanded list
              }}
              style={styles.btnExtraCount}
            >
              <Text style={styles.lblTag}>+{extraCount}</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* nurseView */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: getHeight(10),
            flex: 1,
          }}
        >
          {item.nurse !== null && (
            <View style={styles.nurseview}>
              <Image source={images.imgInjection} />
              <Text style={styles.lblNurseName}>{item.nurse.name}</Text>

              <View style={styles.starRow}>
                {[...Array(totalStars)].map((_, index) => {
                  const isFilled = index < item.nurse.rating; // fill up to ratingStar
                  const iconName = isFilled && images.imgStarFill;

                  return <Image key={index} source={iconName} />;
                })}
              </View>
            </View>
          )}
          <View
            style={{
              marginLeft: 'auto',
              backgroundColor: statusStyle.bg,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: statusStyle.text,
                fontSize: fontSize.size12,
                fontFamily: fontsfamily.gsemiBold,
                textTransform: 'capitalize',
              }}
            >
              {item?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
          centerTitle={getTranslation('historicalanalistext')}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // ================= API ===============================

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
        showLoader: loadType === LoadType.INITIAL,
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
    additionalParams: { family_id: route?.params?.family_memeber_id }, // ✅ Pass it here
    fetcher: fetchOrderList,
  });

  return (
    <HistoricalAnalysisComponent
      navigation={navigation}
      insets={insets}
      historicalanalysisData={orders?.data}
      renderItemHistoricalAnalisis={renderItemHistoricalAnalisis}
      orders={orders}
    />
  );
};

export default HistoricalAnalysisContainer;
