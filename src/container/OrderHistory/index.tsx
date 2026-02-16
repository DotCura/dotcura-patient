import React, { useCallback, useEffect, useState } from 'react';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  activityOpacity,
  currency,
  formatDateToSpanish,
} from '../../constants/GConstant';
import { styles } from './styles';
import { ScreenNames } from '../../constants/AppConstants';
import OrderHistoryComponent from '../../components/OrderHistory';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import { ApiEndPoints } from '../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';

const OrderHistoryContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const orderHistory = [
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
      price: '241.00',
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
      price: '241.00',
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
      price: '241.00',
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
      price: '241.00',
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
      price: '241.00',
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
      price: '241.00',
    },
  ];

  const [orderHistoryData, setOrderHistoryData] = useState<any>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

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

  const renderItemOrderHistory = ({ item, index }: any) => {
    const isExpanded = expandedItems.includes(index);
    const tests = item.all_tests ?? [];
    const visibleTags = isExpanded ? tests : tests.slice(0, 2);
    const extraCount = tests.length - 2;
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnOrderHistory}
        onPress={() => {
          navigation.navigate(ScreenNames.KITANALYSISCONTAINER, {
            booking_id: item?.booking_id,
          });
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
        <View style={styles.nurseview}>
          <Text style={styles.lblPrice}>
            {currency} {item.total}
          </Text>
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

  // ========================== API ==========================

  const fetchOrderList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.ORDER.GETORDERHISTORY,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
          payment_status: 'paid',
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
    fetcher: fetchOrderList,
  });

  return (
    <OrderHistoryComponent
      insets={insets}
      navigation={navigation}
      renderItemOrderHistory={renderItemOrderHistory}
      orders={orders}
    />
  );
};

export default OrderHistoryContainer;
