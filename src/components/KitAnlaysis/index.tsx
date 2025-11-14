import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { ZustandStores } from '../../store';
import { constnatStyles } from '../../constants/Styles';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import BarChartComponent from '../../global/BloodCountGraph';
import { Colors } from '../../constants/Colors';
import { activityOpacity } from '../../constants/GConstant';
import CustomButton from '../../global/Buttons';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

const KitAnalysisComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();
  const KitAnalysisProps = props.KitAnalysisData;
  const totalStars = 5;
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

      <View style={{}}>
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
            onPress={props.startBtnOnPress}
          >
            <Image source={images.imgLeftArrow} />
          </TouchableOpacity>
        </View>
      </View>

      {/* scrollContent */}
      <ScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: getWidth(16),
            paddingBottom: getHeight(250),
          },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* orderDeatislName */}
        <View style={{ marginTop: getHeight(32) }}>
          <Text style={styles.lblKitName}>
            {getTranslation('analsisOf')} {KitAnalysisProps.kitname}
          </Text>
          <Text style={styles.lblWithDrawDate}>
            {getTranslation('withdrawon')}
            {KitAnalysisProps.withdrawalData}
          </Text>
          <Text style={styles.lblKitId}>{KitAnalysisProps.kitid}</Text>
        </View>

        {/* testDetails */}
        <View style={{ marginTop: getHeight(10), gap: getHeight(12) }}>
          {KitAnalysisProps.testReport.map(
            (reportItem: any, reportIndex: any) => {
              return (
                <BarChartComponent
                  currentValue={reportItem.currentvalue}
                  minValue={reportItem.minValue}
                  maxValue={reportItem.maxvalue}
                  width={ScreenDimensions.screenWidth - getWidth(40)}
                  height={getHeight(50)}
                  reportName={reportItem.reportname}
                  reportValue={reportItem.reportValue}
                  reportItem={reportItem}
                />
              );
            },
          )}
        </View>

        {/* NurseandOrderInformation */}
        <View style={{ marginTop: getHeight(24) }}>
          <Text style={styles.lblInformation}>
            {getTranslation('information')}
          </Text>
          <View style={{ marginTop: getHeight(12), gap: getHeight(16) }}>
            {/* leboview */}
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  gap: getWidth(12),
                }}
              >
                <Image source={images.imgLebo} />
                <View>
                  <Text style={styles.lblTitle}>
                    {getTranslation('samplecollectedon')}
                  </Text>
                  <Text style={styles.lblSubtitle}>
                    {KitAnalysisProps.dateandtime}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.grayED,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: getHeight(36),
                  paddingHorizontal: getWidth(12),
                  borderRadius: 20,
                }}
              >
                <Text>{getTranslation('seeorder')}</Text>
              </TouchableOpacity>
            </View>
            {/* nurseview */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getWidth(12),
              }}
            >
              <Image
                source={images.imgNurseUser}
                style={{
                  height: getHeight(24),
                  width: getHeight(24),
                  borderRadius: 999,
                }}
              />
              <View>
                <Text style={styles.lblTitle}>
                  {getTranslation('samletakeuser')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: getWidth(8),
                  }}
                >
                  <Text style={styles.lblSubtitle}>
                    {KitAnalysisProps.doctor.nursename}
                  </Text>
                  <View style={styles.starRow}>
                    {[...Array(totalStars)].map((_, index) => {
                      const isFilled = index < KitAnalysisProps.doctor.rating; // fill up to ratingStar
                      const iconName = isFilled && images.imgStarFill;

                      return <Image key={index} source={iconName} />;
                    })}
                  </View>
                </View>
              </View>
            </View>
            {/* calenderDeliver */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getWidth(12),
              }}
            >
              <Image source={images.imgCalender} />
              <View>
                <Text style={styles.lblTitle}>
                  {getTranslation('diagnose')}
                </Text>
                <Text style={styles.lblSubtitle}>
                  {KitAnalysisProps.deliverdatetime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.vwInviteDetails}>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image source={images.imgfolder} tintColor={Colors.black12}></Image>
          </View>
          <View style={styles.vwInBank}>
            <Text style={styles.txtinvitefriendTitle} numberOfLines={1}>
              {getTranslation('needpaper')}
            </Text>
            <Text style={styles.txtInvoteFriendSubtitle} numberOfLines={5}>
              {getTranslation('collectondes')}{' '}
              <Text style={styles.lblLeboName}>
                {KitAnalysisProps.leboname},{' '}
              </Text>
              {KitAnalysisProps.address}
            </Text>
            <TouchableOpacity
              style={styles.btnInviteFriend}
              activeOpacity={activityOpacity}
            >
              <Text style={styles.lblOpenMap}>{getTranslation('openmap')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <CustomButton
            btnTitle={getTranslation('savepdf')}
            style={{ backgroundColor: Colors.grayED }}
            textStyle={{
              color: Colors.gray0F,
              fontFamily: fontsfamily.bold,
              fontSize: fontSize.size16,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default KitAnalysisComponent;
