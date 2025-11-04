import { Image, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/StylesConstants';
import { Colors } from '../../constants/Colors';
import { FontFamily } from '../../constants/FontFamily';

const PrimaryTitleTextInput = ({
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
  isBorder,
  focusnext,
  ...props
}: any) => {
  const [multiline, setMultiline] = useState(isMultiline);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={[
          styles.container,
          multiline && styles.multilineContainer,
          multiline && {
            paddingVertical: getWidth(16),
          },
        ]}
      >
        {props.leftIcon && (
          <View style={styles.vwTextInputAndIcon}>
            <Image
              source={props.fieldIcon}
              style={[
                styles.imgLeftIcon,
                {
                  alignSelf: isMultiline ? 'flex-start' : 'center',
                },
              ]}
            />
          </View>
        )}

        
        <View
          style={[styles.verticalLine,{alignSelf:isMultiline?'flex-start':'center'}]}
        ></View>

        <View style={{ flex: 1 }}>
          <TextInput
            
            keyboardAppearance="dark"
            selectionColor={Colors.black}
            editable={props.editable}
            keyboardType={props.keyaboardType}
            autoCapitalize={props.autoCapitalize ? 'none' : 'sentences'}
            maxLength={props.maxlength}
            returnKeyType={focusnext ? 'next' : 'default'}
            blurOnSubmit={blur ? true : false}
            ref={refs}
            onSubmitEditing={focusnext}
            scrollEnabled={multiline}
            value={value}
            placeholder={label}
            placeholderTextColor={Colors.black30}
            onChangeText={onChangeFun}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              {
                marginTop: !isMultiline && getHeight(3),
                fontFamily:
                  value.length > 0 ? FontFamily.Medium : FontFamily.Regular,
              },
            ]}
            multiline={multiline}
            numberOfLines={multiline ? 0 : 4}
            secureTextEntry={isPassword && !isPasswordVisible}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

export default PrimaryTitleTextInput;
