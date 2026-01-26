import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TestDetailsComponents from '../../components/TestDetails';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';
import { flashMessageWarning } from '../../constants/GConstant';
import { DateFormatsManager } from '../../constants/utils/DateFormats';

const TestDetailsContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const userReport = {
    id: '1',
    chartData: [
      { value: 1800, date: 'Set 23' },
      { value: 0.14, date: 'Set 24' },
      { value: 0.1, date: 'Dic 24' },
      { value: 0.26, date: 'Gen 25' },
      { value: 0.37, date: 'Set 25' },
    ],
    maxvalue: 0.54,
    minvalue: 0.14,
    reporttitle: 'Glicemia',
    reportlastValue: 0.37,
    status: '',
  };

  const [note, setNote] = useState(
    'e.g. Portare analisi al medico di famiglia',
  );
  const [noteError, setNoteError] = useState<any>('');
  const [userReportData, setUserReportData] = useState({});
  const [IsEmptyLoading, setIsEmptyLoading] = useState(true);

  const onChangeNotes = (text: any) => {
    setNote(text);
  };

  // ================== API =========================

  const _getTestDetails = async () => {
    try {
      const params = {
        test_id: route?.params?.test_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setIsEmptyLoading(false);
          setUserReportData(responseData.data);
        } else {
          setIsEmptyLoading(false);
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.TEST.GETTESTREPORTDETAILS,
        callback,
        params,
      });
    } catch (error) {
      setIsEmptyLoading(false);

      console.log('Analiti details error:', error);
    }
  };

  useEffect(() => {
    _getTestDetails();
  }, []);

  return (
    <TestDetailsComponents
      insets={insets}
      note={note}
      onChangeNotes={onChangeNotes}
      noteError={noteError}
      setNoteError={setNoteError}
      userReportData={userReportData}
      navigation={navigation}
      IsEmptyLoading={IsEmptyLoading}
    />
  );
};

export default TestDetailsContainer;
