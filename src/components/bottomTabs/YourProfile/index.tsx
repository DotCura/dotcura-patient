import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../../constants/Styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { ZustandStores } from '../../../store';
import { styles } from './styles';
import { activityOpacity } from '../../../constants/GConstant';
import { images } from '../../../constants/Images';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';

const YourProfileComponent = (props: any) => {
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

      <View style={{}}>
        {props.searchVisible ? null : (
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
              style={styles.vwHeaderText}
              activeOpacity={activityOpacity}
            >
              <Text style={styles.lblHeaderTitle} numberOfLines={1}>
                Hello Giovanni!
              </Text>
              <Image
                source={images.imgLeftArrow}
                style={{
                  transform: [{ rotate: '270deg' }], // Rotates the box by 45 degrees clockwise
                }}
              />
            </TouchableOpacity>

            <View style={styles.vwHeaderRight}>
              <TouchableOpacity
                onPress={() => {
                  props.setSearchVisible(true);
                }}
                activeOpacity={activityOpacity}
                style={[styles.vwHeaderbtnSearch]}
              >
                <Image source={images.imgSearchBlack} />
                <Text style={styles.lblSearchProfile}>
                  {getTranslation('searchprofile')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={activityOpacity}
                style={styles.vwHeaderbtn}
              >
                <Image source={images.imgCartHome} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {props.searchVisible ? (
          <View
            style={[
              styles.vwMain,
              {
                paddingTop:
                  orderStatus == '' ? props.insets.top + 10 : getHeight(25),
              },
            ]}
          >
            <View style={styles.vwTextinputIcon}>
              <Image source={images.imgSearchBlack} />
              <TextInput
                style={styles.textinputsearch}
                cursorColor={Colors.gray0F}
                selectionColor={Colors.gray0F}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.setSearchVisible(false);
              }}
              style={styles.btnClose}
              activeOpacity={activityOpacity}
            >
              <Image source={images.imgClose} />
            </TouchableOpacity>
          </View>
        ) : null}
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
        {/* LatestAnlaysis */}
        <View style={{ marginTop: getHeight(24) }}>
          <Text style={styles.latestanlaysis}>
            {getTranslation('latestanalysis')}
          </Text>
          <View style={{ marginTop: getHeight(12) }}>
            <FlatList
              onEndReached={() => {
                console.log('callend');
              }}
              data={props.modifiedData}
              renderItem={props.renderItemLatestAnalysis}
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
          style={{ marginHorizontal: getWidth(16), marginTop: getHeight(32) }}
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

          {/* Show Appointment Booked section */}
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

        {/* ReportsView */}
        <View>
          <FlatList
            onEndReached={() => {
              console.log('callendreport');
            }}
            data={props.userReportData}
            renderItem={props.renderUserReportData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              marginTop: getHeight(32),
              gap: getWidth(8),
              marginHorizontal: getWidth(16),
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default YourProfileComponent;
