import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { constnatStyles } from '../../constants/Styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import AppHeader from '../../global/Header';

const HistoricalAnalysisComponent = (props: any) => {
  return (
    <View
      style={[
        constnatStyles.vwContainer,
      ]}
    >
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
      <FlatList
        onEndReached={() => {
          console.log('callend');
        }}
        data={props.historicalanalysisData}
        renderItem={props.renderItemHistoricalAnalisis}
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

export default HistoricalAnalysisComponent;
