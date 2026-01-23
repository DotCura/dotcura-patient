import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import BarChartComponent from '../../global/BloodCountGraph';
import AppHeader from '../../global/Header';

const AnalitiTestDetailComponent = (props: any) => {
  const total = props?.AnalitiTestDetailsData?.total_tests;
  const analyzed = props?.AnalitiTestDetailsData?.completed_tests;

  const progress = analyzed / total;
  const renderHeaderComponent = () => {
    return (
      <View>
        <View style={styles.vwOuterAnalitiTest}>
          <View
            style={[
              styles.vwBlueProgress,
              {
                width: `${progress * 100}%`, // fill based on value
              },
            ]}
          />

          <View style={styles.vwTextTestImage}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lblTestAnaliti}>
                {props.AnalitiTestDetailsData?.name}
              </Text>

              <Text style={styles.lblMainDesCount}>
                <Text style={styles.lblAnalyses}>
                  {props?.AnalitiTestDetailsData?.completed_tests}
                </Text>{' '}
                {getTranslation('oftext')}{' '}
                {props?.AnalitiTestDetailsData?.total_tests}{' '}
                {getTranslation('analitietext')}
              </Text>
            </View>

            {/* RIGHT IMAGE AREA */}

            <Image
              source={{ uri: props?.AnalitiTestDetailsData?.kit_image_url }}
              style={styles.imgTest}
            />
          </View>
        </View>
        <Text style={styles.lblQuotes}>
          {getTranslation('desanalititestdetails')}
        </Text>
      </View>
    );
  };

  const AnalitiTestDetailsDataProps = props.AnalitiTestDetailsData;
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={false}
        showSubTitle={false}
        showEndBtn={false}
      />
      {props.isEmptyLoading === false && (
        <View style={constnatStyles.vwContainer}>
          <FlatList
            data={AnalitiTestDetailsDataProps?.tests}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={{
              paddingBottom: getHeight(60),
              gap: getHeight(12),
            }}
            style={{ flex: 1 }}
            ListHeaderComponent={renderHeaderComponent}
            renderItem={({ item: kit, index: kitIndex }) => (
              <View style={{}}>
                <BarChartComponent
                  key={kit.test_id}
                  currentValue={kit?.report_results[0]?.result_value}
                  minValue={kit?.report_results[0]?.minvalue}
                  maxValue={kit?.report_results[0]?.maxvalue}
                  width={ScreenDimensions.screenWidth - getWidth(40)}
                  height={getHeight(50)}
                  reportName={kit?.test_name}
                  reportValue={kit?.report_results[0]?.result_value}
                  reportItem={kit}
                  onpressreport={props.navigateTestDetailsScreen}
                  isTestCheck={false}
                  isUnitShow={true}
                  unitName={kit?.report_results[0]?.unit}
                />
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};

export default AnalitiTestDetailComponent;
