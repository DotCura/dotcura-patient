import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { activityOpacity } from '../../constants/GConstant';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import AppHeader from '../../global/Header';
import { Colors } from '../../constants/Colors';

const NotificationListComponent = (props: any) => {
  const renderHeaderComponent = () => {
    return (
      <View style={styles.btnNotification}>
        <View style={styles.vwTitleImage}>
          <Text style={styles.title}>
            {getTranslation('notificationalert')}
          </Text>
          <Image
            source={images.imgBell}
            style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
          />
        </View>
        <TouchableOpacity style={styles.btnalert}>
          <Text style={styles.btnalertlbl}>
            {getTranslation('alertbtnlebel')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={true}
        showSubTitle={false}
        showEndBtn={false}
        centerTitle={getTranslation('notificationlistlabel')}
      />
      <FlatList
        data={props.notificationData}
        keyExtractor={(item, index) => item?.notification_id}
        onEndReached={props.notificationList.loadMore}
        onEndReachedThreshold={0.5}
        refreshing={props.notificationList.refreshing}
        onRefresh={props.notificationList.refresh}
        ListFooterComponent={
          props.notificationList.loadingMore ? (
            <ActivityIndicator size="large" color={Colors.blue002} />
          ) : null
        }
        ListEmptyComponent={
          !props.notificationList.loading && !props.notificationList.refreshing ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: getHeight(20),
                marginTop: getHeight(100),
              }}
            >
              <Image source={images.imgNoDataFoundAddress} />
              <Text style={styles.lblNoAddressFound}>
                {getTranslation('nonotificationfound')}
              </Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: getHeight(60),
          paddingHorizontal: getWidth(16),
          paddingTop: getHeight(10),
          backgroundColor: Colors.whiteF2,
        }}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
        ListHeaderComponent={renderHeaderComponent}
        renderItem={props.renderNotificationData}
      />
    </>
  );
};

export default NotificationListComponent;
