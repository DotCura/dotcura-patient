import React, { useEffect, useState } from 'react';
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

  const [orderHistoryData, setOrderHistoryData] = useState(orderHistory);
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

  const renderItemOrderHistory = ({ item, index }: any) => {
    const isExpanded = expandedItems.includes(index);
    const visibleTags = isExpanded ? item.tags : item.tags.slice(0, 2);
    const extraCount = item.tags.length - 2;
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
              {getTranslation('analsisOf')}{formatDateToSpanish(item.date)}
            </Text>
            <Text style={styles.lblOrderID}>
              {getTranslation('orderidlabel')} {item.orderid}
            </Text>
            <Text style={styles.kitandtestdetails}>
              {formatKits(item.kits)}
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={images.imgRightBlack} />
          </TouchableOpacity>
        </View>

        {/* tags */}
        <View style={styles.vwTagMain}>
          {visibleTags.map((tag: any, index: any) => (
            <View key={index} style={styles.vwTagInner}>
              <Text style={styles.lblTag}>{tag}</Text>
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
            {currency} {item.price}
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

  return (
    <OrderHistoryComponent
      insets={insets}
      orderHistoryData={orderHistoryData}
      renderItemOrderHistory={renderItemOrderHistory}
    />
  );
};

export default OrderHistoryContainer;
