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
import { images } from '../../../constants/Images';
const WelcomeComponent = (props: any) => {
  return (
    <View style={styles.vwMain}>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
      >
        <Image source={images.imgapplogo} />
      </ScrollView>
      <CustomButton
        style={{ marginBottom: getHeight(8) }}
        btnPress={props.handleNavigateLogin}
        btnTitle={getTranslation('creteanacoount')}
        btnicon={false}
      />
      <CustomButton
        textStyle={{ color: Colors.blue002 }}
        style={{
          marginBottom: getHeight(8),
          backgroundColor: Colors.blueD1,
        }}
        btnPress={props.handleNavigateLogin}
        btnTitle={getTranslation('Enter')}
        btnicon={false}
      />
      <CustomButton
        textStyle={{ color: Colors.gray0F }}
        style={{
          marginBottom: getWidth(42),
          backgroundColor: Colors.whiteF2,
        }}
        btnPress={props.handleNavigateLogin}
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
        {getTranslation('welcomefirstinfo1')}
        <Text
          onPress={props.handleNavigateTerms}
          style={[
            styles.lblDes,
            {
              textDecorationLine: 'underline',
            },
          ]}
        >
          {getTranslation('termsandconditions')}
        </Text>{' '}
        {getTranslation('andtextwelcome')}{' '}
        <Text
          onPress={props.handleNavigatePrivacy}
          style={[
            styles.lblDes,
            {
              textDecorationLine: 'underline',
            },
          ]}
        >
          {getTranslation('privacypolicy')}
        </Text>{' '}
        {getTranslation('welcomelastinfo2')}
      </Text>
    </View>
  );
};

export default WelcomeComponent;
