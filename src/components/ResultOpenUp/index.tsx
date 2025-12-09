import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import { getHeight } from '../../constants/utils/Dimensions';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';
import { activityOpacity } from '../../constants/GConstant';

const ResultOpenUpComponents = (props: any) => {
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={images.imgFolderOpen}
          style={{ alignSelf: 'center', marginTop: '55%' }}
        />
        <View style={{ marginTop: getHeight(16), gap: getHeight(4) }}>
          <Text style={styles.lblResultOpenTitle} numberOfLines={2}>
            {getTranslation('resultopentitle')}
          </Text>
          <Text style={styles.lblResultOpenSubTitle} numberOfLines={5}>
            {getTranslation('resultopenupsubtitle')}
          </Text>
          <TouchableOpacity activeOpacity={activityOpacity}>
            <Text style={styles.lbldiscoverprivacy}>{getTranslation("discoverourprivacypolicy")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: getHeight(140),
          marginBottom:
            props.insets.bottom > 0
              ? props.insets.bottom
              : props.insets.bottom + getHeight(16),
        }}
      >
        <CustomButton
          btnTitle={getTranslation('saveopenupbtn')}
          // btnPress={props.handleNavigateHome}
        />
        <CustomButton
          btnTitle={getTranslation('continueopenup')}
          style={{ backgroundColor: Colors.white }}
          textStyle={{ color: Colors.gray0F }}
          // btnPress={props.funCloseCancleOrder}
        />
      </View>
    </View>
  );
};

export default ResultOpenUpComponents;
