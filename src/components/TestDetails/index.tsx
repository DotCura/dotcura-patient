import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';
import BarChartComponentDetails from '../../global/BloodCountGraphDetails';
import { images } from '../../constants/Images';
import { activityOpacity } from '../../constants/GConstant';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import VerticalBarChartProfile from '../../global/VerticalBarChartProfile';
import { ZustandStores } from '../../store';
import BarChartComponent from '../../global/BloodCountGraph';
import { DateFormatsManager } from '../../constants/utils/DateFormats';

const TestDetailsComponents = (props: any) => {
  const [rangeType, setRangeType] = React.useState<any>('normal');
  const { orderStatus } = ZustandStores.OrderstatusStore();
  const getBackgroundColorLabel = () => {
    switch (rangeType) {
      case 'normal':
        return Colors.blue2C;
      case 'moderate':
        return Colors.goldenCA;
      case 'extreme':
        return Colors.redE8;
      default:
        return Colors.blue2C;
    }
  };
  const getBackgroundColorOuterLabel = () => {
    switch (rangeType) {
      case 'normal':
        return Colors.blue2C_20;
      case 'moderate':
        return Colors.goldenCA_20;
      case 'extreme':
        return Colors.redE8_20;
      default:
        return Colors.blue2C_20;
    }
  };

  const kittestdetails = {
    id: '1',
    isTest: true,
    reportname: 'Urine',
    reportValue: '2.2',
    currentvalue: 11000,
    minValue: 1000,
    maxvalue: 10000,
    reportunit: 'pH',
  };

  // console.log("DateFormatsManager.formatDate(props?.userReportData?.trend[0]?.date,DateFormatsManager.DateFormats.DDMMYYYY_SLASH",DateFormatsManager.formatDate(props?.userReportData?.trend[0]?.date,DateFormatsManager.DateFormats.DDMMYYYY_SLASH));

  return (
    <>
      <View
        style={[
          styles.vwMain,
          {
            paddingTop:
              orderStatus == '' ? props.insets.top + 10 : getHeight(25),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            console.log('hy');

            props.navigation.goBack();
          }}
          activeOpacity={activityOpacity}
        >
          <Image source={images.imgLeftArrow} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={[constnatStyles.lblHeaderTitle, props?.headerTextStyle]}
            numberOfLines={2}
          >
            {props?.userReportData?.test?.name}
          </Text>
          <Text
            style={[
              constnatStyles.lblSubHeaderTitle,
              props?.headerSubTextStyle,
            ]}
            numberOfLines={2}
          >
            {props?.userReportData?.trend?.[0]?.date &&
              DateFormatsManager.formatDate(
                props?.userReportData?.trend?.[0]?.date,
                DateFormatsManager.DateFormats.DDMMYYYY_SLASH,
              ) +
                '-' +
                DateFormatsManager.formatDate(
                  props?.userReportData?.trend?.[0]?.date,
                  DateFormatsManager.TimeFormats.HHmm,
                )}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={props._likeUnlikeReport}
          activeOpacity={activityOpacity}
        >
          <Image
            source={
              props?.userReportData?.test?.is_liked
                ? images.imgfavblack // ❤️ liked image
                : images.imgFavUnfiled // 🤍 unlike image
            }
          />
        </TouchableOpacity>
      </View>
      {props.IsEmptyLoading === false && (
        <ScrollView
          contentContainerStyle={[
            constnatStyles.keyboardContainer,
            {
              paddingHorizontal: getWidth(16),
              paddingBottom: getHeight(110),
            },
          ]}
          bounces={true}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
        >
          {/* vwTestDes */}
          <View>
            <View style={styles.vwTestDes}>
              <Text style={styles.lblValueDes}>
                {getTranslation('thevalueis')}
              </Text>

              <Text
                style={[
                  styles.lblValue,
                  {
                    color: getBackgroundColorLabel(),
                  },
                ]}
              >
                {' '}
                {props?.userReportData?.test?.name}{' '}
              </Text>
            </View>

            <View
              style={[
                styles.vwTestTitleInner,
                {
                  backgroundColor: getBackgroundColorOuterLabel(),
                },
              ]}
            >
              <View
                style={[
                  styles.vwTestTitle,
                  {
                    backgroundColor: getBackgroundColorLabel(),
                  },
                ]}
              >
                <Text style={styles.lblValueDes}>
                  {props?.userReportData?.latest?.trendLabel}
                </Text>
              </View>
            </View>

            <Text style={styles.lblValueDes}>
              {getTranslation('lowethensub')}
            </Text>
          </View>

          {/* vwValue */}
          <View style={{ marginTop: getHeight(18) }}>
            <View style={{}}>
              <Text style={styles.lblTestValue}>
                {props?.userReportData?.latest?.value}
                <Text style={styles.lblUnit}>
                  {' '}
                  {props?.userReportData?.latest?.unit}
                </Text>
              </Text>
              <BarChartComponentDetails
                currentValue={props?.userReportData?.latest?.value}
                minValue={props?.userReportData?.latest?.minvalue}
                maxValue={props?.userReportData?.latest?.maxvalue}
                width={ScreenDimensions.screenWidth - getWidth(40)}
                height={getHeight(40)}
                reportItem={kittestdetails}
                onRangeTypeChange={setRangeType} // ✅ IMPORTANT
              />
              <View style={styles.vwOptimalAndPercentage}>
                {props?.userReportData?.previous !== null && (
                  <View style={styles.vwPercentage}>
                    <Text style={styles.lblPercentage}>
                      {getTranslation('percentage')}
                    </Text>
                    <Text style={styles.lblValuePecentage}>
                      {props?.userReportData?.previous}{' '}
                      <Text style={styles.lblUnitsmall}>
                        {props?.userReportData?.latest?.unit}
                      </Text>
                    </Text>
                  </View>
                )}
                <View style={styles.vwPercentage}>
                  <Text style={styles.lblPercentage}>
                    {getTranslation('valueoptimal')}
                  </Text>
                  <Text style={styles.lblValuePecentage}>
                    {props?.userReportData?.latest?.minvalue} -{' '}
                    {props?.userReportData?.latest?.maxvalue}{' '}
                    <Text style={styles.lblUnitsmall}>
                      {props?.userReportData?.latest?.unit}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* veTrade */}
          <View>
            <Text style={styles.lblTrade}>{getTranslation('trend')}</Text>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 20,
                padding: 16,
                gap: getHeight(6),
                marginTop: getHeight(12),
              }}
            >
              <VerticalBarChartProfile
                data={props?.userReportData?.trend}
                chartMaxValue={props?.userReportData?.latest?.maxvalue}
                chartMinValue={props?.userReportData?.latest?.minvalue}
              />
            </View>
          </View>
          {/* vwNote */}
          {/* <View style={{ marginTop: getHeight(24) }}>
        <PrimaryTitleTextInput
          placHolderLabel={getTranslation('placeholdernote')}
          inputLabel={getTranslation('note')}
          blur={true}
          leftIcon={false}
          keyaboardType={'default'}
          value={props.note}
          onChangeFun={props.onChangeNotes}
          errorMessage={props.noteError}
          setErrorMessage={props.setNoteError}
          maxlength={1000}
          isMultiline={false}
          isBorder={false}
        />
      </View> */}
          {/* vwQuery */}
          <View style={{ marginTop: getHeight(24) }}>
            {/* vwwarning */}
            <View
              style={[styles.vwwarningDetails1, { marginBottom: getHeight(8) }]}
            >
              <View style={styles.vwInBank}>
                <Text style={styles.txtBankDetails} numberOfLines={1}>
                  {getTranslation('high')}
                </Text>
                <Text style={styles.txtWeCanNot} numberOfLines={5}>
                  {props?.userReportData?.test?.high_description}
                </Text>
              </View>
            </View>
            {/* vwwarning */}
            <View style={styles.vwwarningDetails1}>
              <View style={styles.vwInBank}>
                <Text style={styles.txtBankDetails} numberOfLines={1}>
                  {getTranslation('low')}
                </Text>
                <Text style={styles.txtWeCanNot} numberOfLines={5}>
                  {props?.userReportData?.test?.low_description}
                </Text>
              </View>
            </View>
            {/* vwwarning */}
            {/* <View style={styles.vwwarningDetails}>
          <View
            style={{
              flexDirection: 'row',
              gap: getWidth(6),
              alignItems: 'center',
            }}
          >
            <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
              <Image
                source={images.imgWarning}
                tintColor={Colors.black12}
              ></Image>
            </View>
            <View style={styles.vwInBank}>
              <Text style={styles.txtBankDetailsyellow} numberOfLines={1}>
                {getTranslation('querytitle')}
              </Text>
              <Text style={styles.txtWeCanNotYellow} numberOfLines={5}>
                {getTranslation('querysub')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnChnageQuery}
            activeOpacity={activityOpacity}
          >
            <Text style={styles.lblChangeQuery}>
              {getTranslation('changequery')}
            </Text>
          </TouchableOpacity>
        </View> */}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default TestDetailsComponents;
