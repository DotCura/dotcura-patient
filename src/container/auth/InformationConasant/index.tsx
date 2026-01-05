import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import InformationConasantComponent from '../../../components/auth/InformationConasant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../../constants/AppConstants';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { flashMessageWarning } from '../../../constants/GConstant';
import { APIManager } from '../../../api/APIManager';
import { MmkvManager } from '../../../constants/utils/MmkvManager';

const InformationConasantContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);

  const [selectedInfo, setSelectedInfo] = useState(1);

  const handlePressContinue = async () => {
    await _infoConstantApi();
  };

  //=========================== API ========================================

  const _infoConstantApi = async () => {
    try {
      toggleLoader(true);
      const params = {
        steps: '2',
        terms: selectedInfo == 1 ? 0 : 2,
      };

      const callback = async (responseData: any) => {
        console.log(responseData, 'reponseData of api UPDATE PROFILE');
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          console.log(responseData, 'UPDATE PROFILE');
          await MmkvManager.setData(
            MmkvManager.Keys.userDetails,
            responseData.data,
          );
          navigation.navigate(ScreenNames.ALLSETCONATINER);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.COMPLETEPROFILE,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Login error:', error);
    }
  };

  return (
    <InformationConasantComponent
      insets={insets}
      headerArray={headerArray}
      selectedInfo={selectedInfo}
      setSelectedInfo={setSelectedInfo}
      handlePressContinue={handlePressContinue}
      navigation={navigation}
    />
  );
};

export default InformationConasantContainer;
