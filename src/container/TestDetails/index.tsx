import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TestDetailsComponents from '../../components/TestDetails';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const TestDetailsContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const userReport = {
    id: '1',
    chartData: [
      { value: 1800, date: 'Set 23', color: Colors.goldenCA },
      { value: 0.14, date: 'Set 24', color: Colors.redCA },
      { value: 0.1, date: 'Dic 24', color: Colors.goldenCA },
      { value: 0.26, date: 'Gen 25', color: Colors.goldenCA },
      { value: 0.37, date: 'Set 25', color: Colors.goldenCA },
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
  const [userReportData, setUserReportData] = useState(userReport);

  const onChangeNotes = (text: any) => {
    setNote(text);
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
          showSubTitle={true}
          showEndBtn={false}
          centerTitle={'Glicemia'}
          centerSubTitle={'8/8/2025' + '-' + '17:09'}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);
  return (
    <TestDetailsComponents
      insets={insets}
      note={note}
      setNote={setNote}
      onChangeNotes={onChangeNotes}
      noteError={noteError}
      setNoteError={setNoteError}
      userReportData={userReportData}
      navigation={navigation}
    />
  );
};

export default TestDetailsContainer;
