import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import KitAnalysisComponent from '../../components/KitAnlaysis';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const KitAnalysisContainer = () => {
  const insets = useSafeAreaInsets();

  const KitAnalysis = {
    kitname: 'diabete',
    withdrawalData: '8/8/2025',
    kitid: '#12340',
    testReport: [
      {
        id: '1',
        reportname: 'Urine',
        reportValue: 'pH: 2.2',
        currentvalue: 11000,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '1',
        reportname: 'Emoglobina glicata',
        reportValue: '0.37mg/dL',
        currentvalue: 11000,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '2',
        reportname: 'Microalbuminuria',
        reportValue: '18 mg/g',
        currentvalue: 2000,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '3',
        reportname: 'Urine',
        reportValue: 'pH: 2.2',
        currentvalue: 100,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '4',
        reportname: 'Creatininemia',
        reportValue: '18 mg/g',
        currentvalue: 4000,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '5',
        reportname: 'Urine',
        reportValue: 'pH: 2.2',
        currentvalue: 100,
        minValue: 1000,
        maxvalue: 10000,
      },
      {
        id: '6',
        reportname: 'Urine',
        reportValue: 'pH: 2.2',
        currentvalue: 11000,
        minValue: 1000,
        maxvalue: 10000,
      },
    ],
    dateandtime: '8/8/2025 alle 9:28',
    doctor: {
      nurseid: '1',
      nursename: 'Giovanni C.',
      rating: 5,
    },
    deliverdatetime: '8/8/2025 alle 17:09',
    leboname:"Centro Diagnostico San Ciro",
    address:"Via Lamazza, 14B - Napoli",
  };

  const [KitAnalysisData, setKitAnalysisData] = useState(KitAnalysis);

  return (
    <KitAnalysisComponent insets={insets} KitAnalysisData={KitAnalysisData} />
  );
};

export default KitAnalysisContainer;
