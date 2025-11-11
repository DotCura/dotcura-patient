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
import TitleSubtitle from '../../../global/TitleSubtitle';
const AllSetComponent = (props: any) => {
  return (
    <View style={styles.vwMain}>
      <View style={styles.vwMain}>
        <Text style={styles.lblMainTitle}>{getTranslation('allready')}</Text>
        <Text style={styles.lblMainSubtitle}>
          {getTranslation('youarereadytostart')}
        </Text>
      </View>
      <CustomButton
        style={{
          marginBottom: props.insets.bottom + getHeight(16),
          alignSelf: 'flex-end',
        }}
        btnPress={props.onPressContinue}
        btnTitle={getTranslation('gototheapp')}
        btnicon={false}
      />
    </View>
  );
};

export default AllSetComponent;
