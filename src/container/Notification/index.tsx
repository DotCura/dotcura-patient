import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import NotificationListComponent from '../../components/Notification';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { activityOpacity } from '../../constants/GConstant';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { getHeight } from '../../constants/utils/Dimensions';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import { ApiEndPoints } from '../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';

const NotificationListContainer = ({ navigation }: any) => {
  const notification = [
    {
      id: '1',
      orderid: '#121314',
      date: '2025-12-24',
      notificationtitle:
        'Ottime notizie! La visita è confermata per oggi alle 10:00',
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
      notificationtitle: 'L’infermiere è quasi da te. Fatti trovare a casa!',
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
  ];

  const [notificationData, setNotifcationData] = useState(notification);

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

  const renderNotificationData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnNotification}
      >
        <View style={styles.vwTitleImage}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.lblOrderID}>{item?.message}</Text>
          </View>
          <Image
            source={images.imgRightCurve}
            style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
          />
        </View>
        <View>
          {/* <Text style={styles.lblOrderID}>
            {getTranslation('orderidlabel')} {item.orderid}
          </Text> */}
          {/* <Text style={styles.kitandtestdetails}>{formatKits(item.kits)}</Text> */}
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
          centerTitle={getTranslation('notificationlistlabel')}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //======================== API ===========================
  const fetchNotificationList = useCallback(
    async ({
      page,
      loadType,
    }: {
      page: number;
      searchQuery?: string;
      loadType: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.SETTINGS.NOTIFICATIONLIST,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
        },
      });

      return {
        ...res,
        data: res?.data,
      };
    },
    [navigation],
  );

  const notificationList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchNotificationList,
  });

  return (
    <NotificationListComponent
      notificationList={notificationList}
      navigation={navigation}
      notificationData={notificationList?.data}
      renderNotificationData={renderNotificationData}
    />
  );
};

export default NotificationListContainer;
