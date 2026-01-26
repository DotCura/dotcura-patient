import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnalitiTestDetailComponent from '../../components/AnalitiTestDetail';
import AppHeader from '../../global/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import { ScreenNames } from '../../constants/AppConstants';
import { flashMessageWarning, goToTabScreen } from '../../constants/GConstant';
import { APIManager } from '../../api/APIManager';
import { ApiEndPoints, MethodType, StatusCode } from '../../api/APIConstant';
import { getTags } from 'react-native-device-info';
import { getTranslation } from '../../localization/i18n/i18n.config';

const AnalitiTestDetailContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const AnalitiTestdetails = {
    id: '1',
    totalreport: 8,
    currentreport: 7,
    testimage: images.imgHeart,
    kits: [
      {
        kitype: 'kit',
        kitname: 'Diabete',
        kittest: [
          {
            id: '1',
            isTest: true,
            reportname: 'Colesterolo Totale',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '6',
            isTest: true,
            reportname: 'Colesterolo LDL',
            reportValue: '0.37',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '2',
            isTest: true,
            reportname: 'Trigliceridi',
            reportValue: '18',
            currentvalue: 2000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'mg/g',
          },
          {
            id: '3',
            isTest: false,
            reportname: 'Coloresterolo HDL',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '4',
            isTest: true,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '18 mg/g',
            currentvalue: 4000,
            minValue: 1000,
            maxvalue: 10000,
          },
          {
            id: '5',
            isTest: false,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '2.2',
            currentvalue: 100,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
          },
          {
            id: '6',
            isTest: false,
            reportname: 'Profilo Lipidico Completo',
            reportValue: '2.2',
            currentvalue: 11000,
            minValue: 1000,
            maxvalue: 10000,
            reportunit: 'pH',
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

  const [AnalitiTestDetailsData, setAnalitiTestDetailsData] = useState([]);
  const [isEmptyLoading, setIsEmptyLoading] = useState(true);

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  const navigateTestDetailsScreen = (item: any) => {
    {
      item.has_report === true
        ? navigation.navigate(ScreenNames.TESTDETAILSCONTAINER, {
            test_id: item?.test_id,
          })
        : flashMessageWarning(getTranslation('reportnotavailable'));
    }
  };
  const navigateTestGetTestedScreem = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.GETTESTEDCONTAINER,
    });
  };

  useEffect(() => {
    header();
    _getAnalitiDetails();
  }, []);

  // ======================== API ====================================
  const _getAnalitiDetails = async () => {
    try {
      const params = {
        kit_id: route?.params?.analitiId,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setIsEmptyLoading(false);
          setAnalitiTestDetailsData(responseData.data.analysis_list[0]);
        } else {
          setIsEmptyLoading(false);
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ANALITI.GETANALITIDETAILS,
        callback,
        params,
      });
    } catch (error) {
      setIsEmptyLoading(false);

      console.log('Analiti details error:', error);
    }
  };

  return (
    <AnalitiTestDetailComponent
      isEmptyLoading={isEmptyLoading}
      insets={insets}
      navigation={navigation}
      AnalitiTestDetailsData={AnalitiTestDetailsData}
      navigateTestDetailsScreen={navigateTestDetailsScreen}
      navigateTestGetTestedScreem={navigateTestGetTestedScreem}
    />
  );
};

export default AnalitiTestDetailContainer;
