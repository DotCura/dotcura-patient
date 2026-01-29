import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { constnatStyles } from '../../constants/Styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import AppHeader from '../../global/Header';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';

const HistoricalAnalysisComponent = (props: any) => {
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
        centerTitle={getTranslation('historicalanalistext')}
      />
      <View style={[constnatStyles.vwContainer]}>
        <FlatList
          onEndReached={props.orders.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={props.orders.refreshing}
          onRefresh={props.orders.refresh}
          ListFooterComponent={
            props.orders.loadingMore ? (
              <ActivityIndicator size="large" color={Colors.blue002} />
            ) : null
          }
          ListEmptyComponent={
            !props.orders.loading && !props.orders.refreshing ? (
              <View style={styles.emptyview}>
                <Image source={images.imgMicroscope} />
                <Text style={styles.orderhistoryemptytitle} numberOfLines={1}>
                  {getTranslation('orderhistoryemptytitle')}
                </Text>
                <Text
                  style={styles.orderhistoryemptysubtitle}
                  numberOfLines={3}
                >
                  {getTranslation('orderhistoryemptysubtitle')}
                </Text>
              </View>
            ) : null
          }
          data={props.historicalanalysisData}
          renderItem={props.renderItemHistoricalAnalisis}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: getWidth(8),
            marginTop: getHeight(24),
            paddingBottom: props.insets.bottom + getHeight(40),
          }}
        />
      </View>
    </>
  );
};

export default HistoricalAnalysisComponent;
