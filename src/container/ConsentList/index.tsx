import React, { useState, useEffect } from 'react';
import ConsentListComponent from '../../components/ConsentList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import {
  flashMessageWarning,
  flashMessageSucess,
} from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { MmkvManager } from '../../constants/utils/MmkvManager';

const ConsentListContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [consentList, setConsentList] = useState<any[]>([]);
  const [selectedConsents, setSelectedConsents] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConsentList();
  }, []);

  const getConsentList = async () => {
    toggleLoader(true);
    setIsLoading(true);
    try {
      const callback = (responseData: any) => {
        toggleLoader(false);
        setIsLoading(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const list = responseData.data?.consent_list || [];
          setConsentList(list);

          const patientConsents = responseData.data?.patient_consent_data || [];
          const acceptedIds = patientConsents
            .filter(
              (pc: any) => pc.is_accepted === 1 || pc.is_accepted === true,
            )
            .map((pc: any) => Number(pc.consent_id));

          setSelectedConsents(acceptedIds);
        } else {
          setConsentList([]);
          if (responseData.code === StatusCode.INVALID_OR_FAIL) {
            flashMessageWarning(responseData.message);
          }
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.SETTINGS.GETCONSENTLISTUSER,
        callback,
        params: {},
      });
    } catch (err) {
      toggleLoader(false);
      setIsLoading(false);
      setConsentList([]);
      console.log('Error fetching consent list:', err);
    }
  };

  const toggleConsent = (id: number) => {
    setSelectedConsents(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const requiredConsents = consentList.filter(item => item.type === 'REQUIRED');
  const isSaveDisabled =
    requiredConsents.length > 0
      ? !requiredConsents.every(item => selectedConsents.includes(item.id))
      : false;

  const handlePressSave = async () => {
    await _updateConsentApi();
  };

  const _updateConsentApi = async () => {
    toggleLoader(true);
    try {
      const params = {
        consent_ids: selectedConsents,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        if (responseData.code === StatusCode.SUCCESS) {
          flashMessageSucess(
            responseData.message || 'Consensi aggiornati con successo',
          );
          navigation.goBack();
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.SETTINGS.UPDATECONSENT,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('Update consent error:', error);
    }
  };

  return (
    <ConsentListComponent
      insets={insets}
      consentList={consentList}
      selectedConsents={selectedConsents}
      toggleConsent={toggleConsent}
      isSaveDisabled={isSaveDisabled}
      handlePressSave={handlePressSave}
      navigation={navigation}
      isLoading={isLoading}
    />
  );
};

export default ConsentListContainer;
