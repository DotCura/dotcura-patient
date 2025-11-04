import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { getHeight, getWidth, opacity } from "../../constants/StylesConstants";
import { ImageConstants } from "../../constants/ImageConstants";

const CustomButton = (props: any) => {
  const { style, textStyle } = props;
  return (
    <TouchableOpacity
      onPress={props.btnPress}
      activeOpacity={opacity}
      style={[styles.btn, style]}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        {props.btnicon && (
          <Image
            source={props.btnImage}
            style={{
              alignSelf: "center",
              resizeMode: "contain",
              width: getWidth(30),
              aspectRatio: 1,
              marginTop:-2
              // height: getHeight(30),
            }}
          ></Image>
        )}
        <Text numberOfLines={1} style={[styles.lblTitle, textStyle]}>
          {props.btnTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
