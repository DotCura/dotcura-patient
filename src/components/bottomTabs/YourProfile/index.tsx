import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../../constants/Styles';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { ZustandStores } from '../../../store';
import { styles } from './styles';
import { activityOpacity } from '../../../constants/GConstant';
import { images } from '../../../constants/Images';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';

const YourProfileComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();

  const searchAnim = useSharedValue(0);

  React.useEffect(() => {
    searchAnim.value = withTiming(props.searchVisible ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.22, 0.68, 0.01, 0.99),
    });
  }, [props.searchVisible]);

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: 1 - searchAnim.value,
    transform: [
      {
        translateX: -searchAnim.value * ScreenDimensions.screenWidth,
      },
    ],
  }));

  const searchAnimStyle = useAnimatedStyle(() => ({
    opacity: searchAnim.value,
    transform: [
      {
        translateX: (1 - searchAnim.value) * ScreenDimensions.screenWidth,
      },
    ],
  }));

  const renderListHeader = () => {
    console.log('header render');

    return (
      <>
        {/* LatestAnalysis */}
        {props.modifiedData.length !== 0 && (
          <View style={{ marginBottom: getHeight(20) }}>
            <View style={styles.vwSeeall}>
              <Text style={styles.latestanlaysis}>
                {getTranslation('latestanalysis')}
              </Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                onPress={props.handleNavigateHistoricalAnlysis}
              >
                <Text style={styles.seeall}>{getTranslation('seeall')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: getHeight(12) }}>
              <FlatList
                data={props.modifiedData.slice(0, 4)}
                renderItem={props.renderItemLatestAnalysis}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={item => item.booking_id}
                contentContainerStyle={{
                  gap: getWidth(8),
                  paddingLeft: getWidth(16),
                  paddingRight: getWidth(16),
                }}
              />
            </View>
          </View>
        )}

        {/* waitingforresultof */}
        {/* <View style={{ marginHorizontal: getWidth(16) }}>
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
        </View> */}

        {/* waitingforresultof */}
        <View
          style={{
            marginHorizontal: getWidth(16),
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
      </>
    );
  };

  //dropdown
  const dropdownAnim = useSharedValue(0);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (props.showPopup) {
      setDropdownVisible(true);

      // 🌊 Spring for movement
      dropdownAnim.value = withSpring(1, {
        damping: 5,
        stiffness: 120,
        mass: 0.6,
      });

      // 🎯 Timing for opacity
      dropdownOpacity.value = withTiming(1, { duration: 120 });
    } else {
      dropdownOpacity.value = withTiming(0, { duration: 100 });

      dropdownAnim.value = withTiming(0, { duration: 160 }, finished => {
        if (finished) {
          runOnJS(setDropdownVisible)(false);
        }
      });
    }
  }, [props.showPopup]);

  const dropdownAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: dropdownAnim.value,
      transform: [
        {
          translateY: (1 - dropdownAnim.value) * -6, // slide from top
        },
        {
          scale: 0.97 + dropdownAnim.value * 0.03, // subtle zoom
        },
      ],
    };
  });

  const selectedMember = props.familyMembersData?.find(
    (m: any) => m.id === props.selectedFamilyId,
  );

  const selectedTitle =
    selectedMember?.relationship_name || getTranslation('youtextyourprofile');

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
        {/* NORMAL HEADER */}
        <Animated.View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
              position: 'absolute',
              width: '100%',
            },
            headerAnimStyle,
          ]}
          pointerEvents={props.searchVisible ? 'none' : 'auto'}
        >
          <TouchableOpacity
            style={styles.vwHeaderText}
            activeOpacity={activityOpacity}
            onPress={() => props.setShowPopup(true)}
          >
            <Text style={styles.lblHeaderTitle} numberOfLines={1}>
              Il {selectedTitle}
            </Text>
            <Image
              source={images.imgLeftArrow}
              style={{ transform: [{ rotate: '270deg' }] }}
            />
          </TouchableOpacity>

          <View style={styles.vwHeaderRight}>
            <TouchableOpacity
              onPress={() => props.setSearchVisible(true)}
              activeOpacity={activityOpacity}
              style={styles.vwHeaderbtnSearch}
            >
              <Image source={images.imgSearchBlack} />
              <Text style={styles.lblSearchProfile}>
                {getTranslation('searchprofile')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={props.handlePressProfile}
              activeOpacity={activityOpacity}
              style={styles.vwHeaderbtn}
            >
              <Image source={images.imgUserHome} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* SEARCH HEADER */}
        <Animated.View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
            },
            searchAnimStyle,
          ]}
          pointerEvents={props.searchVisible ? 'auto' : 'none'}
        >
          <View style={styles.vwTextinputIcon}>
            <Image source={images.imgSearchBlack} />
            <TextInput
              style={styles.textinputsearch}
              cursorColor={Colors.gray0F}
              selectionColor={Colors.gray0F}
              autoFocus={props.searchVisible}
              value={props.searchHistory}
              onChangeText={(text: any) => {
                props.setSeachHistory(text);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              props.setSearchVisible(false);
              props.setSeachHistory('');
            }}
            style={styles.btnClose}
            activeOpacity={activityOpacity}
          >
            <Image source={images.imgClose} tintColor={Colors.blue002} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* POPUP WITH ANIMATION */}
      {dropdownVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          {/* 👇 OUTSIDE AREA */}
          <Pressable
            style={{ flex: 1 }}
            onPress={() => props.setShowPopup(false)}
          />

          {/* 👇 ANIMATED DROPDOWN */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 16,
                top: 38,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                padding: 6,
                gap: getHeight(7),
                elevation: 4,
                backgroundColor: Colors.white,
                marginTop:
                  orderStatus == '' ? props.insets.top + 10 : getHeight(25),
              },
              dropdownAnimatedStyle,
            ]}
          >
            {props.familyMembersData.map((item: any, index: number) => {
              const isSelected = item.id === props.selectedFamilyId;

              return (
                <TouchableOpacity
                  key={`family-${index}`}
                  style={[styles.itemRow, isSelected && styles.selectedRow]}
                  activeOpacity={activityOpacity}
                  onPress={() => {
                    props.setSelectedFamilyId(item.id);
                    props.setShowPopup(false);
                  }}
                >
                  <Image
                    source={images.imgRightTickBlack}
                    style={{ opacity: isSelected ? 1 : 0 }}
                  />
                  <Text
                    style={[styles.itemText, isSelected && styles.selectedText]}
                  >
                    {item.relationship_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      )}

      {/* vwTestReports */}
      {props.orders?.loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.blue1C}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -100,
          }}
        />
      ) : (
        <FlatList
          onEndReached={props.AnalitiList.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={
            props.AnalitiList.refreshing ||
            props.familyMemberList.refreshing ||
            props.pendingOrder.refreshing
          }
          onRefresh={props.handleRefresh}
          ListFooterComponent={
            props.AnalitiList.loadingMore ? (
              <ActivityIndicator size="large" color={Colors.blue002} />
            ) : null
          }
          ListEmptyComponent={
            !props.AnalitiList.loading && !props.AnalitiList.refreshing ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: getHeight(20),
                  marginTop: '50%',
                }}
              >
                <Image source={images.imgNoDataFoundAddress} />
                <Text style={styles.lblNoAddressFound}>
                  {getTranslation('noAnlitilistfound')}
                </Text>
              </View>
            ) : null
          }
          onScroll={() => {
            props.setShowPopup(false);
          }}
          style={{ flex: 1 }}
          ListHeaderComponent={renderListHeader}
          data={props.testReportData}
          renderItem={props.renderTestReportData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            gap: getHeight(12),
            paddingBottom: getHeight(130),
            paddingTop: getHeight(24),
          }}
        />
      )}
    </View>
  );
};

export default YourProfileComponent;
