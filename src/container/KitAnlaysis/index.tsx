import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import KitAnalysisComponent from '../../components/KitAnlaysis';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { flashMessageWarning } from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { ZustandStores } from '../../store';

const KitAnalysisContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const setCartCount = ZustandStores.CartStore(state => state.setCartCount);

  // const KitAnalysis = {
  //   kitname: 'diabete',
  //   withdrawalData: '8/8/2025',
  //   kitid: '#12340',
  //   testReport: [
  //     {
  //       id: '1',
  //       reportname: 'Urine',
  //       reportValue: 'pH: 2.2',
  //       currentvalue: 11000,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '1',
  //       reportname: 'Emoglobina glicata',
  //       reportValue: '0.37mg/dL',
  //       currentvalue: 11000,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '2',
  //       reportname: 'Microalbuminuria',
  //       reportValue: '18 mg/g',
  //       currentvalue: 2000,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '3',
  //       reportname: 'Urine',
  //       reportValue: 'pH: 2.2',
  //       currentvalue: 100,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '4',
  //       reportname: 'Creatininemia',
  //       reportValue: '18 mg/g',
  //       currentvalue: 4000,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '5',
  //       reportname: 'Urine',
  //       reportValue: 'pH: 2.2',
  //       currentvalue: 100,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //     {
  //       id: '6',
  //       reportname: 'Urine',
  //       reportValue: 'pH: 2.2',
  //       currentvalue: 11000,
  //       minValue: 1000,
  //       maxvalue: 10000,
  //     },
  //   ],
  //   dateandtime: '8/8/2025 alle 9:28',
  //   doctor: {
  //     nurseid: '1',
  //     nursename: 'Giovanni C.',
  //     rating: 5,
  //   },
  //   deliverdatetime: '8/8/2025 alle 17:09',
  //   leboname: 'Centro Diagnostico San Ciro',
  //   address: 'Via Lamazza, 14B - Napoli',
  // };

  const kitAnalysis = {
    id: '1',
    orderid: '#121314',
    date: '2025-12-24',
    price: '35.00',
    dateandtime: '8/8/2025 alle 9:28',
    deliverdatetime: '8/8/2025 alle 17:09',
    leboname: 'Centro Diagnostico San Ciro',
    address: 'Via Lamazza, 14B - Napoli',
    kits: [
      {
        kitype: 'kit',
        kitname: 'Diabete',
        kittest: [
          {
            id: '1',
            isTest: true,
            reportname: 'Urine',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '1',
            isTest: true,
            reportname: 'Emoglobina glicata',
            reportValue: '0.37',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '2',
            isTest: true,
            reportname: 'Microalbuminuria',
            reportValue: '18',
            currentvalue: 2000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '3',
            isTest: true,
            reportname: 'Urine',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '4',
            isTest: true,
            reportname: 'Creatininemia',
            reportValue: '18 mg/g',
            currentvalue: 4000,
            minValue: 1000,
            maxvalue: 10000,
          },
          {
            id: '5',
            isTest: true,
            reportname: 'Urine',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '6',
            isTest: true,
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
            isTest: true,
            reportname: 'Urine',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '2',
            isTest: true,
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
  };

  const [KitAnalysisData, setKitAnalysisData] = useState({});

  const handleNavigationGoBack = () => {
    navigation.goBack();
  };

  const handlePressCheckout = () => {
    _reOrder();
  };

  const handleNavigationTestDetails = (item: any) => {
    console.log('item=======>', item);

    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER, {
      test_id: item?.test_id,
    });
  };

  const _getReportDetails = async () => {
    try {
      const params = {
        booking_id: route?.params?.booking_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setKitAnalysisData(responseData.data);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.REPORT.GETREPORTDETAILS,
        callback,
        params,
      });
    } catch (error) {
      console.log('getOrderDetails details error:', error);
    }
  };

  const _reOrder = async () => {
    try {
      const params = {
        booking_id: route?.params?.booking_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
          setCartCount(responseData?.data?.total_items);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.REPORT.REORDER,
        callback,
        params,
      });
    } catch (error) {
      console.log('_reorder details error:', error);
    }
  };

  useEffect(() => {
    _getReportDetails();
  }, []);

  return (
    <KitAnalysisComponent
      insets={insets}
      KitAnalysisData={KitAnalysisData}
      handleNavigationGoBack={handleNavigationGoBack}
      handleNavigationTestDetails={handleNavigationTestDetails}
      handlePressCheckout={handlePressCheckout}
      bookingIDParams={route?.params?.booking_id}
    />
  );
};

export default KitAnalysisContainer;
