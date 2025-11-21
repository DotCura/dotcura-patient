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
      <View style={{ }}>
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
              Hello Giovanni!
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
        {/* vwwarning */}
        <View style={styles.vwwarningDetails}>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image
              source={images.imgWarning}
              tintColor={Colors.black12}
            ></Image>
          </View>
          <View style={styles.vwInBank}>
            <Text style={styles.txtBankDetails} numberOfLines={1}>
              {getTranslation('outdatedtitle')}
            </Text>
            <Text style={styles.txtWeCanNot} numberOfLines={5}>
              {getTranslation('outdatedsubtitle')}
            </Text>
          </View>
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

        {/* vwrecommnandanalysis */}
        <View style={[styles.vwLatestValue]}>
          <View style={{ marginHorizontal: getWidth(16) }}>
            <Text style={styles.lblLatestValue}>
              {getTranslation('recommandanalysis')}
            </Text>
          </View>

          {/* vwFavourites */}
          <View>
            <FlatList
              onEndReached={() => {
                console.log('callend');
              }}
              data={props.recommandAnalysisData}
              renderItem={props.renderRecommandAnlaysisData}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                gap: getWidth(12),
                paddingLeft: getWidth(16),
                paddingRight: getWidth(16),
              }}
            />
          </View>
        </View>

        {/* vwinvotedFriend */}
        <View style={styles.vwInviteDetails}>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image
              source={images.imgWarning}
              tintColor={Colors.black12}
            ></Image>
          </View>
          <View style={styles.vwInBank}>
            <Text style={styles.txtinvitefriendTitle} numberOfLines={1}>
              {getTranslation('invitefriendtitle')}
            </Text>
            <Text style={styles.txtInvoteFriendSubtitle} numberOfLines={5}>
              {getTranslation('invitefriendsubtitle')}
            </Text>
            <TouchableOpacity
              style={styles.btnInviteFriend}
              activeOpacity={activityOpacity}
            >
              <Text>{getTranslation('invitefriend')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* vwFamilyMemberReport */}
        <View style={styles.vwFamilyMemberReport}>
          {props.familyMemberAnalysisData.map((item: any, index: any) => {
            return (
              <View key={item.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: getHeight(12),
                  }}
                >
                  <Text style={styles.lblFamilyMemberAnlaysisTitle}>
                    {getTranslation('familymemberanlaysisvalue')}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.grayED,
                      paddingVertical: getHeight(3),
                      paddingHorizontal: getWidth(4),
                      borderRadius: 999,
                      marginLeft: getWidth(3),
                      gap:getWidth(2)
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.grayD8,
                        height: getHeight(18),
                        width: getWidth(18),
                        borderRadius: 321,
                      }}
                    >
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
                          height={getHeight(50)}
                          reportName={reportItem.reportname}
                          reportValue={reportItem.reportValue}
                          reportItem={reportItem}
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
