import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import CustomButton from '../../../global/Buttons';
import { Colors } from '../../../constants/Colors';
const WelcomeComponent = (props: any) => {
  return (
    <View style={styles.vwMain}>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ flex: 1 }}
      ></ScrollView>
      <CustomButton
        style={{ marginBottom: getHeight(8) }}
        btnPress={props.onPressContinue}
        btnTitle={getTranslation('applyasnurse')}
        btnicon={false}
      />
      <CustomButton
        textStyle={{ color: Colors.blue17 }}
        style={{
          marginBottom: getHeight(8),
          backgroundColor: Colors.lightBlurE4,
        }}
        btnPress={props.onPressContinue}
        btnTitle={getTranslation('Enter')}
        btnicon={false}
      />
      <CustomButton
        textStyle={{ color: Colors.gray0F }}
        style={{
          marginBottom: getWidth(42),
          backgroundColor: Colors.white,
        }}
        btnPress={props.onPressContinue}
        btnTitle={getTranslation('icantaccess')}
        btnicon={false}
      />

      <Text
        style={[
          styles.lblDes,
          {
            marginBottom: props.insets.bottom + getHeight(10),
            textAlign: 'center',
            lineHeight: getHeight(15),
          },
        ]}
      >
        {getTranslation('termsandconditiondisc')}
      </Text>
    </View>
  );
};

export default WelcomeComponent;
