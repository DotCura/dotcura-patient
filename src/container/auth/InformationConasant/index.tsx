import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
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

  const [consentList, setConsentList] = useState<any[]>([]);
  const [selectedConsents, setSelectedConsents] = useState<number[]>([]);

  useEffect(() => {
    getConsentList();
  }, []);

  const getConsentList = async () => {
    toggleLoader(true);
    try {
      const callback = (responseData: any) => {
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          setConsentList(responseData.data?.items || []);
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.AUTH.GETCONSENTLIST,
        callback,
      });
    } catch (err) {
      toggleLoader(false);
      console.log('Error:', err);
    }
  };

  const toggleConsent = (id: number) => {
    setSelectedConsents(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const requiredConsents = consentList.filter(item => item.type === 'REQUIRED');
  const isContinueDisabled =
    requiredConsents.length > 0
      ? !requiredConsents.every(item => selectedConsents.includes(item.id))
      : false;

  const handlePressContinue = async () => {
    await _infoConstantApi();
  };

  //=========================== API ========================================

  const _infoConstantApi = async () => {
    try {
      const params = {
        steps: '2',
        consent_ids: selectedConsents,
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
      consentList={consentList}
      selectedConsents={selectedConsents}
      toggleConsent={toggleConsent}
      isContinueDisabled={isContinueDisabled}
      handlePressContinue={handlePressContinue}
      navigation={navigation}
    />
  );
};

export default InformationConasantContainer;
