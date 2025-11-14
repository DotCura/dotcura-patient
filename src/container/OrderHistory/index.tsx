import React, { useEffect, useState } from 'react';
import OrderHistoryComponent from '../../components/OrderHistory';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { activityOpacity } from '../../constants/GConstant';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { styles } from './styles';

const OrderHistoryContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const orderHistory = [
    {
      id: '1',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '2',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '3',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '4',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '5',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '6',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
  ];

  const [orderHistoryData, setOrderHistoryData] = useState(orderHistory);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const totalStars = 5;

  const renderItemAppointment = ({ item, index }: any) => {
    const isExpanded = expandedItems.includes(index);
    const visibleTags = isExpanded ? item.tags : item.tags.slice(0, 2);
    const extraCount = item.tags.length - 2;
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnOrderHistory}
      >
        {/* orderDetailsView */}
        <View style={styles.vwMainOrderDetails}>
          <View style={{ flex: 1, gap: getHeight(2) }}>
            <Text style={styles.lblOrderTitle}>{item.title}</Text>
            <Text style={styles.lblOrderDate}>{item.date}</Text>
            <Text style={styles.lblOrderID}>{item.orderid}</Text>
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
          <Image source={item.doctor.image} />
          <Text>{item.doctor.name}</Text>

          <View style={styles.starRow}>
            {[...Array(totalStars)].map((_, index) => {
              const isFilled = index < item.doctor.rating; // fill up to ratingStar
              const iconName = isFilled && images.imgStarFill;

              return <Image key={index} source={iconName} />;
            })}
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
          }}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
          centerTitle={getTranslation('orderhistory')}
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
      renderItemAppointment={renderItemAppointment}
    />
  );
};

export default OrderHistoryContainer;
