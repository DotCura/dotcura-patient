import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { getWidth, opacity } from '../../constants/StylesConstants';
import { ImageConstants } from '../../constants/ImageConstants';
import { Colors } from '../../constants/Colors';
import { FontFamily } from '../../constants/FontFamily';

const PrimaryTitleMoblieNumber = ({
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

  //formoblienumber
  const [countryCode, setCountryCode] = useState<any>('US');
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(true);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [visible, setVisible] = useState(false);

  const onSelect = (country: any) => {
    props.setCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {visible && (
        <CountryPicker
          {...{
            withFilter: true,
            countryCode,
            withFlag,
            withCountryNameButton,
            withAlphaFilter,
            withCallingCode,
            onSelect,
          }}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}

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
          <View
          style={styles.verticalLine}
        ></View>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.vwCountryCode}
            activeOpacity={opacity}
          >
            <Text style={styles.lblCountryCode}>+{props.callingCode}</Text>
            <Image
              source={ImageConstants.imgArrowDown}
              style={{ marginTop: -4 }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardAppearance="dark"
            selectionColor={Colors.black}
            returnKeyType={focusnext ? 'next' : 'default'}
            keyboardType="phone-pad"
            blurOnSubmit={blur ? true : false}
            ref={refs}
            onSubmitEditing={focusnext}
            value={value}
            placeholder={label}
            placeholderTextColor={Colors.black30}
            onChangeText={onChangeFun}
            style={[
              styles.input,

              {
                fontFamily: value.length>0?FontFamily.Medium:FontFamily.Regular,
                marginTop: !isMultiline && 3,
              },
            ]}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

export default PrimaryTitleMoblieNumber;
