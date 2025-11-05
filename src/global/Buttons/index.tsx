import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { activityOpacity } from '../../constants/GConstant';

const CustomButton = (props: any) => {
  const { style, textStyle, imgstyle } = props;
  return (
    <TouchableOpacity
      onPress={props.btnPress}
      activeOpacity={activityOpacity}
      style={[styles.btn, style]}
    >
      <View style={styles.vwBtn}>
        <View>
          {props.btnicon && (
            <Image
              source={props.btnImage}
              style={[styles.imgIcon, imgstyle]}
            ></Image>
          )}
        </View>
        <Text numberOfLines={1} style={[styles.lblTitle, textStyle]}>
          {props.btnTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
