import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
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
import BarChartComponent from '../../../global/BloodCountGraph';
import { ZustandStores } from '../../../store';
import PressScale from '../../../global/PressScale';

const HomeComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();

  const renderListFooter = () => {
    return (
      <PressScale onPress={props.handleNavigateYourProfileScreen}>
        <View style={styles.addBtn}>
          <Text style={styles.addText}>
            {getTranslation('viewalltestresult')}
          </Text>
        </View>
      </PressScale>
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
              {getTranslation('hytext')} {props.firstName}!
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
              {props.cartCount > 0 && (
                <View style={styles.vwTextCount}>
                  <Text style={styles.labelTextCount}>{props.cartCount}</Text>
                </View>
              )}
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
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            colors={[Colors.blue1C]} // Android
            tintColor={Colors.blue1C} // iOS
          />
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* vwTotalDaysInfo */}
        <View style={styles.vwTotalDaysInfo}>
          <Image source={images.imgCalenderBlue} />
          <View style={styles.vwDaysAndBook}>
            <View style={styles.vwInnerDays}>
              <Text style={styles.lblDaysText}>
                {props.lastBookingDays} {getTranslation('daystext')}
              </Text>
              <Text style={styles.lblSinceyourlastanlaysis}>
                {getTranslation('sinceyourlastanalysis')}
              </Text>
            </View>
            <PressScale onPress={props.handleNavigateGetTested}>
              <View style={styles.btnBookNow}>
                <Text style={styles.lblBookNow}>
                  {getTranslation('booknowtext')}
                </Text>
              </View>
            </PressScale>
          </View>
        </View>

        {props.isloadingshow && (
          <>
            {/* vwTestReports */}
            <View style={styles.vwTestReports}>
              {props.lastBookingDays === null ? (
                <View style={styles.vwEmpty}>
                  <View
                    style={{ marginHorizontal: getWidth(7), gap: getHeight(2) }}
                  >
                    <Text style={styles.emptyTitle} numberOfLines={1}>
                      {getTranslation('emptytitle')}
                    </Text>
                    <Text style={styles.emptySubtitle} numberOfLines={5}>
                      {getTranslation('emptysubtitle')}
                    </Text>
                  </View>
                  <CustomButton
                    btnTitle={getTranslation('booktext')}
                    style={{ backgroundColor: Colors.blueD1 }}
                    btnPress={props.handleNavigateGetTested}
                    textStyle={{ color: Colors.blue002 }}
                  />
                </View>
              ) : (
                <>
                  <Text style={styles.lblMyHealth}>
                    {getTranslation('myhealtthtext')}
                  </Text>

                  <FlatList
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
                </>
              )}
            </View>

            {/* vwLatestValue */}
            {props.latestAnalysisData.length !== 0 && (
              <View style={styles.vwLatestValue}>
                <View style={{ marginHorizontal: getWidth(16) }}>
                  <Text style={styles.lblLatestValue}>
                    {getTranslation('latestvalue')}
                  </Text>
                </View>

                {/* vwReport */}
                <View>
                  <FlatList
                    onEndReached={props.favourites.loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                      props.favourites.loadingMore ? (
                        <ActivityIndicator
                          size="large"
                          color={Colors.blue002}
                        />
                      ) : null
                    }
                    data={props.latestAnalysisData}
                    renderItem={props.renderLatestAnlaysisData}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={item => item?.test?.id}
                    contentContainerStyle={{
                      gap: getWidth(8),
                      paddingLeft: getWidth(16),
                      paddingRight: getWidth(16),
                    }}
                    // ===== ADD THESE SNAP PROPERTIES =====
                    snapToInterval={
                      ScreenDimensions.screenWidth * 0.85 + getWidth(16)
                    } // Card width + gap
                    snapToAlignment="center" // Snap to the start of each item
                    decelerationRate="fast" // Makes snapping feel smoother
                    pagingEnabled={false} // Keep false to use snapToInterval
                    // ===== END OF SNAP PROPERTIES =====
                  />
                </View>
              </View>
            )}

            {/* waitingforresultof */}
            <View
              style={{
                marginHorizontal: getWidth(16),
                marginTop: getHeight(29),
              }}
            >
              {props.appointmentsData.some(
                (a: any) =>
                  a.agenda_status === 'complete_visit' ||
                  a.agenda_status === 'start_delivery' ||
                  a.agenda_status === 'complete_delivery' ||
                  a.agenda_status === 'ReportPending',
              ) && (
                <Text style={styles.lblWaitingForResult}>
                  {getTranslation('waitingforresultof')}
                </Text>
              )}

              {props.appointmentsData
                .filter(
                  (a: any) =>
                    a.agenda_status === 'complete_visit' ||
                    a.agenda_status === 'start_delivery' ||
                    a.agenda_status === 'complete_delivery' ||
                    a.agenda_status === 'ReportPending',
                )
                .map((item: any, index: any) => (
                  <React.Fragment key={`waiting-${index}`}>
                    {props.renderItemAppointment({ item, index })}
                  </React.Fragment>
                ))}

              {props.appointmentsData.some(
                (a: any) =>
                  a.agenda_status === 'Request' ||
                  a.agenda_status === 'Accept' ||
                  a.agenda_status === 'start_visit' ||
                  a.agenda_status === 'arrived',
              ) && (
                <Text style={styles.lblWaitingForResult}>
                  {getTranslation('appointmentbook')}
                </Text>
              )}

              {props.appointmentsData
                .filter(
                  (a: any) =>
                    a.agenda_status === 'Request' ||
                    a.agenda_status === 'Accept' ||
                    a.agenda_status === 'start_visit' ||
                    a.agenda_status === 'arrived',
                )
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
                        activeOpacity={1}
                        style={styles.btnfamilymembername}
                      >
                        <View style={styles.vwfirstchart}>
                          <Text style={styles.lblFirstChar}>
                            {getInitials(item.name)}
                          </Text>
                        </View>
                        <Text
                          style={styles.lblFamilyMember}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.lblFamilyMemberAnlaysisTitle}>
                        {' '}
                        :{' '}
                      </Text>
                    </View>
                    <View style={{ gap: getHeight(8) }}>
                      {item.reports.map((reportItem: any, reportIndex: any) => {
                        return (
                          <BarChartComponent
                            currentValue={reportItem.reportDetails.value}
                            minValue={reportItem.reportDetails.minvalue}
                            maxValue={reportItem.reportDetails.maxvalue}
                            width={ScreenDimensions.screenWidth - getWidth(40)}
                            height={getHeight(30)}
                            reportName={reportItem.testname}
                            reportValue={reportItem.reportDetails.value}
                            reportItem={reportItem}
                            onpressreport={
                              props.handleNavigateTestDetailsScreen
                            }
                            isTestCheck={true}
                            isUnitShow={true}
                            unitName={reportItem.reportDetails.unit}
                          />
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeComponent;
