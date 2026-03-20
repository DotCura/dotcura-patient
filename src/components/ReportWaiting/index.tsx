import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { activityOpacity } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import CustomButton from '../../global/Buttons';

const ReportWaitingComponent = (props: any) => {
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={images.imgTestTube} style={{ alignSelf: 'center' }} />
        <View style={{ marginTop: getHeight(16), gap: getHeight(4) }}>
          <Text style={styles.lblReportWaitingTitle} numberOfLines={2}>
            {getTranslation('waitingreporttitle')}
          </Text>
          <Text style={styles.lblReportWaitingSubTitle} numberOfLines={5}>
            {getTranslation('waitingreportsubtitle')}
          </Text>
          <CustomButton
            btnTitle={getTranslation('waitingreportbtn')}
            btnPress={() => props.navigation.goBack()}
            style={{ backgroundColor: Colors.blueD1, marginTop: getWidth(24) }}
            textStyle={{ color: Colors.blue002 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportWaitingComponent;
