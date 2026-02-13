import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import AppHeader from '../../global/Header';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { getTranslation } from '../../localization/i18n/i18n.config';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { activityOpacity } from '../../constants/GConstant';
import CustomButton from '../../global/Buttons';

const ContactUsComponent = (props: any) => {
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={true}
        centerTitle={getTranslation('support')}
        showSubTitle={false}
        showEndBtn={false}
        isNotificationIcon={false}
      />
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          { paddingHorizontal: 0 },
        ]}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
      >
        <Text
          style={[
            constnatStyles.lblMainTitle,
            { marginLeft: getWidth(16), marginTop: getHeight(23) },
          ]}
          numberOfLines={2}
        >
          {getTranslation('supporttitle')}
        </Text>
        <View style={styles.vwMap}>
          {props.contactUsData.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.vwInnerMap}>
                <Text style={styles.lblName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.lblSubtitle} numberOfLines={3}>
                  {item.subtitle}
                </Text>
                <CustomButton
                  btnPress={item.btnPressfun}
                  btnTitle={item.btnName}
                  style={{ backgroundColor: Colors.blueD1 }}
                  textStyle={{ color: Colors.blue002 }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default ContactUsComponent;
