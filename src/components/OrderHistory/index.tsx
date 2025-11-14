import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { constnatStyles } from '../../constants/Styles';

const OrderHistoryComponent = (props: any) => {
  return (
    <View
      style={[
        constnatStyles.vwContainer,
      ]}
    >
      <FlatList
        onEndReached={() => {
          console.log('callend');
        }}
        data={props.orderHistoryData}
        renderItem={props.renderItemAppointment}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: getWidth(8),
          marginTop: getHeight(24),
          paddingBottom: props.insets.bottom + getHeight(40),
        }}
      />
    </View>
  );
};

export default OrderHistoryComponent;
