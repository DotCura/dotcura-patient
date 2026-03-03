import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ResultOpenUpComponents from '../../components/ResultOpenUp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { ScreenNames } from '../../constants/AppConstants';

const ResultOpenUpContainers = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  console.log('booking id:', route?.params?.booking_id);

  const _saveReport = async () => {
    try {
      const params = {
        booking_id: route?.params?.booking_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          flashMessageSucess(responseData.message);
          navigation.navigate(ScreenNames.KITANALYSISCONTAINER, {
            booking_id: route?.params?.booking_id,
            resultOpenUp: true,
          });
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.REPORT.SAVEREPORT45DAYS,
        callback,
        params,
      });
    } catch (error) {
      console.log('save report error:', error);
    }
  };

  const handleNavigateKitAnlysis = async () => {
    navigation.navigate(ScreenNames.KITANALYSISCONTAINER, {
      booking_id: route?.params?.booking_id,
      resultOpenUp: true,
    });
  };

  return (
    <ResultOpenUpComponents
      insets={insets}
      _saveReport={_saveReport}
      handleNavigateKitAnlysis={handleNavigateKitAnlysis}
    />
  );
};

export default ResultOpenUpContainers;
