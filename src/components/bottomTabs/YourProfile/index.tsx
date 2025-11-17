import {
  FlatList,
  Image,
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
import CustomButton from '../../../global/Buttons';

const YourProfileComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();

  const renderListHeader = () => {
    return (
      <>
        {/* LatestAnalysis */}
        <View style={{ marginTop: getHeight(24) }}>
          <Text style={styles.latestanlaysis}>
            {getTranslation('latestanalysis')}
          </Text>
          <View style={{ marginTop: getHeight(12) }}>
            <FlatList
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
      </>
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
              onPress={() => props.setShowPopup(true)}
            >
              <Text style={styles.lblHeaderTitle} numberOfLines={1}>
                {props.selectedName}
              </Text>
              <Image
                source={images.imgLeftArrow}
                style={{
                  transform: [{ rotate: '270deg' }],
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
        {props.showPopup == true && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              left: 16,
              top: 35,
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              padding: 6,
              gap: getHeight(7),
              elevation: 4,
              backgroundColor: Colors.white,
              marginTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
            }}
          >
            {props.familyMembersData.map((item: any, index: any) => {
              const isSelected = item.familymembername === props.selectedName;
              return (
                <TouchableOpacity
                  key={`family-${index}`}
                  style={[styles.itemRow, isSelected && styles.selectedRow]}
                  onPress={() => {
                    props.setSelectedName(item.familymembername);
                    props.setShowPopup(false);
                  }}
                >
                  {isSelected ? (
                    <Image source={images.imgRightTickBlack} />
                  ) : (
                    <Image
                      source={images.imgRightTickBlack}
                      style={{ opacity: 0 }}
                    />
                  )}
                  <View style={{ alignSelf: 'flex-start' }}>
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {item.familymembername}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* vwEmpty */}
      {/* <View style={styles.vwEmpty}>
        <View style={{ marginHorizontal: getWidth(7), gap: getHeight(2) }}>
          <Text style={styles.emptyTitle} numberOfLines={1}>
            {getTranslation('emptytitleprofile')}
          </Text>
          <Text style={styles.emptySubtitle} numberOfLines={5}>
            {getTranslation('emptysubtitleprofile')}
          </Text>
        </View>
        <CustomButton
          //  btnPress={props.handlePressLoginFun}
          btnTitle={getTranslation('bookorder')}
          style={{
            backgroundColor: Colors.lightBlurE4,
          }}
          textStyle={{ color: Colors.blue17 }}
        />
      </View> */}

      {/* vwReportsList */}
      <FlatList
        data={props.userReportData}
        renderItem={props.renderUserReportData}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        onEndReached={() => {
          console.log('callendreport');
        }}
        onEndReachedThreshold={0.5}
        onScroll={() => {
          props.setShowPopup(false);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: getHeight(150),
          gap: getWidth(8),
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default YourProfileComponent;
