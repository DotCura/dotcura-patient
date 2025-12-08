import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import { images } from '../../constants/Images';

const OrderHistoryComponent = (props: any) => {
  return (
    <View style={[constnatStyles.vwContainer]}>
      <Text style={styles.lblOrderHistory}>
        {getTranslation('orderhistoryprofile')}
      </Text>
      {/* <FlatList
        onEndReached={() => {
          console.log('callend');
        }}
        data={props.orderHistoryData}
        renderItem={props.renderItemOrderHistory}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: getWidth(8),
          marginTop: getHeight(24),
          paddingBottom: props.insets.bottom + getHeight(40),
        }}
      /> */}
      {/* emptyview */}
      <View style={styles.emptyview}>
        <Image source={images.imgMicroscope} />
        <Text style={styles.orderhistoryemptytitle} numberOfLines={1}>
          {getTranslation('orderhistoryemptytitle')}
        </Text>
        <Text style={styles.orderhistoryemptysubtitle} numberOfLines={3}>
          {getTranslation('orderhistoryemptysubtitle')}
        </Text>
      </View>
    </View>
  );
};

export default OrderHistoryComponent;
