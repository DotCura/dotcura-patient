import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../../constants/Styles';
import CustomButton from '../../../global/Buttons';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { activityOpacity, getInitials } from '../../../constants/GConstant';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';
import BarChartComponent from '../../../global/BloodCountGraph';
import { ZustandStores } from '../../../store';

{
  /* veEmpty */
}
{
  /* <View style={styles.vwEmpty}>
        <View style={{ marginHorizontal: getWidth(7), gap: getHeight(2) }}>
          <Text style={styles.emptyTitle} numberOfLines={1}>
            {getTranslation('emptytitle')}
          </Text>
          <Text style={styles.emptySubtitle} numberOfLines={5}>
            {getTranslation('emptysubtitle')}
          </Text>
        </View>
        <CustomButton
          //  btnPress={props.handlePressLoginFun}
          btnTitle={getTranslation('booktext')}
          style={{ backgroundColor: Colors.lightBlurE4 }}
          textStyle={{ color: Colors.blue17 }}
        />
      </View> */
}

const HomeComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();
  const renderListFooter = () => {
    return (
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={activityOpacity}
        onPress={props.handleNavigateYourProfileScreen}
      >
        <Text style={styles.addText}>
          {getTranslation('viewalltestresult')}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          paddingHorizontal: 0,
        },
      ]}
    >
      {/* vwHeader */}
      <View>
        <View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
            },
          ]}
        >
          <View style={styles.vwHeaderText}>
            <Text style={styles.lblHeaderTitle} numberOfLines={1}>
              {getTranslation('hytext')} Giovanni!
            </Text>
          </View>

          <View style={styles.vwHeaderRight}>
            <TouchableOpacity
              onPress={props.handleNavigateProfileScreen}
              activeOpacity={activityOpacity}
              style={styles.vwHeaderbtn}
              hitSlop={10}
            >
              <Image source={images.imgUserHome} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={props.handleNavigateCheckoutScreen}
                activeOpacity={activityOpacity}
                style={styles.vwHeaderbtn}
                hitSlop={10}
              >
                <Image source={images.imgCartHome} />
              </TouchableOpacity>
              <View style={styles.vwTextCount}>
                <Text style={styles.labelTextCount}>2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* scrollContent */}
      <ScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: 0,
            paddingBottom: getHeight(250),
          },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* vwTotalDaysInfo */}
        <View style={styles.vwTotalDaysInfo}>
          <Image source={images.imgCalenderBlue} />
          <View style={styles.vwDaysAndBook}>
            <View style={styles.vwInnerDays}>
              <Text style={styles.lblDaysText}>
                45 {getTranslation('daystext')}
              </Text>
              <Text style={styles.lblSinceyourlastanlaysis}>
                {getTranslation('sinceyourlastanalysis')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnBookNow}
              activeOpacity={activityOpacity}
              onPress={props.handleNavigateGetTested}
            >
              <Text style={styles.lblBookNow}>
                {getTranslation('booknowtext')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* vwTestReports */}
        <View style={styles.vwTestReports}>
          <Text style={styles.lblMyHealth}>
            {getTranslation('myhealtthtext')}
          </Text>
          <FlatList
            onEndReached={() => {
              console.log('callend');
            }}
            data={props.testReportData}
            renderItem={props.renderTestReportData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              gap: getHeight(12),
              marginTop: getHeight(12),
            }}
            ListFooterComponent={renderListFooter}
          />
        </View>

        {/* vwLatestValue */}
        <View style={styles.vwLatestValue}>
          <View style={{ marginHorizontal: getWidth(16) }}>
            <Text style={styles.lblLatestValue}>
              {getTranslation('latestvalue')}
            </Text>
          </View>

          {/* vwReport */}
          <View>
            <FlatList
              onEndReached={() => {
                console.log('callend');
              }}
              data={props.latestAnalysisData}
              renderItem={props.renderLatestAnlaysisData}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                gap: getWidth(8),
                paddingLeft: getWidth(16),
                paddingRight: getWidth(16),
              }}
            />
          </View>
        </View>

        {/* waitingforresultof */}
        <View
          style={{ marginHorizontal: getWidth(16), marginTop: getHeight(29) }}
        >
          {props.appointmentsData.some((a: any) => a.status === 'waiting') && (
            <Text style={styles.lblWaitingForResult}>
              {getTranslation('waitingforresultof')}
            </Text>
          )}

          {props.appointmentsData
            .filter((a: any) => a.status === 'waiting')
            .map((item: any, index: any) => (
              <React.Fragment key={`waiting-${index}`}>
                {props.renderItemAppointment({ item, index })}
              </React.Fragment>
            ))}

          {props.appointmentsData.some((a: any) => a.status === 'booked') && (
            <Text style={styles.lblWaitingForResult}>
              {getTranslation('appointmentbook')}
            </Text>
          )}

          {props.appointmentsData
            .filter((a: any) => a.status === 'booked')
            .map((item: any, index: any) => (
              <React.Fragment key={`booked-${index}`}>
                {props.renderItemAppointment({ item, index })}
              </React.Fragment>
            ))}
        </View>

        {/* vwFamilyMemberReport */}
        <View style={styles.vwFamilyMemberReport}>
          {props.familyMemberAnalysisData.map((item: any, index: any) => {
            return (
              <View key={item.id}>
                <View style={styles.vwmainFamilyMember}>
                  <Text style={styles.lblFamilyMemberAnlaysisTitle}>
                    {getTranslation('familymemberanlaysisvalue')}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    style={styles.btnfamilymembername}
                  >
                    <View style={styles.vwfirstchart}>
                      <Text style={styles.lblFirstChar}>
                        {getInitials(item.familyMemberName)}
                      </Text>
                    </View>
                    <Text style={styles.lblFamilyMember}>
                      {item.familyMemberName}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.lblFamilyMemberAnlaysisTitle}> : </Text>
                </View>
                <View style={{ gap: getHeight(8) }}>
                  {item.familyMemberReport.map(
                    (reportItem: any, reportIndex: any) => {
                      return (
                        <BarChartComponent
                          currentValue={reportItem.currentvalue}
                          minValue={reportItem.minValue}
                          maxValue={reportItem.maxvalue}
                          width={ScreenDimensions.screenWidth - getWidth(40)}
                          height={getHeight(30)}
                          reportName={reportItem.reportname}
                          reportValue={reportItem.reportValue}
                          reportItem={reportItem}
                          onpressreport={props.handleNavigateTestDetailsScreen}
                        />
                      );
                    },
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeComponent;
