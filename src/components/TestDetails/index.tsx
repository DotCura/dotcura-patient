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

const TestDetailsComponents = (props: any) => {
  const [rangeType, setRangeType] = React.useState('normal');
  const getGradientByRange = () => {
    switch (rangeType) {
      case 'normal':
        return [Colors.white, Colors.grayED];
      case 'moderate':
        return [Colors.white, Colors.goldenFD];
      case 'extreme':
        return [Colors.white, Colors.redFD];
      default:
        return [Colors.white, Colors.goldenF9];
    }
  };
  return (
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
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      {/* vwTestDes */}
      <View style={styles.vwTestDes}>
        <Text style={styles.lblValueDes}>{getTranslation('thevalueis')}</Text>
        <View style={styles.vwTestTitle}>
          <Text style={styles.lblValue}> glicemia </Text>
        </View>
        <Text style={styles.lblValueDes}>{getTranslation('lowethen')}</Text>
      </View>

      {/* vwValue */}
      <View style={{ marginTop: getHeight(16) }}>
        <LinearGradient
          colors={getGradientByRange()}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.card}
        >
          <View style={{ padding: 24 }}>
            <Text style={styles.lblTestValue}>
              0.37<Text style={styles.lblUnit}>mg/dL</Text>
            </Text>
            <BarChartComponentDetails
              currentValue={500}
              minValue={1000}
              maxValue={10000}
              width={ScreenDimensions.screenWidth - getWidth(40)}
              height={getHeight(40)}
              onRangeTypeChange={setRangeType}
            />
            <View style={styles.vwOptimalAndPercentage}>
              <View style={styles.vwPercentage}>
                <Text style={styles.lblPercentage}>
                  {getTranslation('percentage')}
                </Text>
                <Text style={styles.lblValuePecentage}>0.4 - 1.2</Text>
              </View>
              <View style={styles.vwPercentage}>
                <Text style={styles.lblPercentage}>
                  {getTranslation('valueoptimal')}
                </Text>
                <Text style={styles.lblValuePecentage}>0.4 - 1.2</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* veTrade */}
      <View>
        <Text style={styles.lblTrade}>{getTranslation('trend')}</Text>
        <View
          style={{
            borderWidth: 2,
            borderColor: Colors.grayED,
            borderRadius: 20,
            padding: 16,
            gap: getHeight(6),
            marginTop: getHeight(12),
          }}
        >
          <VerticalBarChartProfile
            data={props.userReportData.chartData}
            chartMaxValue={props.userReportData.maxvalue}
            chartMinValue={props.userReportData.minvalue}
            navigation={props.navigation}
          />
        </View>
      </View>
      {/* vwNote */}
      <View style={{ marginTop: getHeight(24) }}>
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
      </View>
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
              Valori alti indicano troppo zucchero nel sangue, che può derivare
              da alimentazione ricca di carboidrati, stress o essere segnale di
              prediabete/diabete.
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
              Valori bassi di glicemia indicano poco zucchero nel sangue, spesso
              causato da digiuno prolungato o attività fisica intensa. Potresti
              aver avvertito tremori, sudorazione o debolezza.
            </Text>
          </View>
        </View>
        {/* vwwarning */}
        <View style={styles.vwwarningDetails}>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default TestDetailsComponents;
