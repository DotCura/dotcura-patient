import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';

import { Colors } from '../../constants/Colors';

const PrimaryTitleSecurityTextInput = ({
  label,
  value,
  onChangeFun,
  isPassword,
  isMobile,
  isMultiline,
  countryCodePressed,
  screenName,
  refs,
  blur,
  focusnext,
  isBorder,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [multiline, setMultiline] = useState(isMultiline);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={[
          styles.container,
          multiline && styles.multilineContainer,
          multiline && {
            paddingVertical: getWidth(8),
          },
        ]}
      >
        <View style={styles.vwTextInputAndIcon}>
          <Image source={props.fieldIcon} style={styles.imgLeftIcon}></Image>
        </View>
        <View style={styles.verticalLine}></View>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardAppearance="dark"
            selectionColor={Colors.black}
            returnKeyType={focusnext ? 'next' : 'default'}
            blurOnSubmit={blur ? true : false}
            ref={refs}
            onSubmitEditing={focusnext}
            value={value}
            placeholder={label}
            placeholderTextColor={Colors.black30}
            onChangeText={onChangeFun}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              {
                fontFamily:
                  value.length > 0 ? FontFamily.Medium : FontFamily.Regular,
                marginTop: !multiline && 4,
              },
            ]}
            multiline={multiline}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...props}
          />
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'center', marginLeft: getWidth(10) }}
          onPress={() => setIsPasswordVisible(prevState => !prevState)}
        >
          <Image
            style={{ height: getHeight(25), aspectRatio: 1 }}
            tintColor={Colors.black30}
            source={
              isPasswordVisible
                ? ImageConstants.imgEyeShow
                : ImageConstants.imgEyeHide
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrimaryTitleSecurityTextInput;
