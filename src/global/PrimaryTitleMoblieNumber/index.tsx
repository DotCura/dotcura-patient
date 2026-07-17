import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { styles } from './styles';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import { Colors } from '../../constants/Colors';
import { getWidth } from '../../constants/utils/Dimensions';
import { activityOpacity } from '../../constants/GConstant';
import { images } from '../../constants/Images';

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
  errorMessage,
  setErrorMessage,
  onFocus,
  onBlur,
  ...props
}: any) => {
  const [multiline, setMultiline] = useState(isMultiline);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalError, setInternalError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  //formoblienumber
  const [countryCode, setCountryCode] = useState<any>('US');
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(true);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [visible, setVisible] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(refs, () => ({
    focus: () => {
      // Focus logic if needed
      inputRef.current?.focus();
    },
    setError: (error: string) => {
      setInternalError(error);
    },
    clearError: () => {
      setInternalError('');
    },
  }));

  const displayError = errorMessage || internalError;

  const getBorderColor = () => {
    if (displayError) return Colors.red8C;
    if (isFocused) return Colors.blue002;
    return Colors.grayD8;
  };

  const getBackgroundColor = () => {
    if (displayError) return Colors.redFD;
    return Colors.white;
  };

  const handleFocus = () => {
    setIsFocused(true);

    if (internalError) {
      setInternalError('');
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    if (internalError) {
      setInternalError('');
    }

    if (errorMessage && setErrorMessage) {
      setErrorMessage('');
    }

    onChangeFun(text);
  };

  const onSelect = (country: any) => {
    props.setCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
  };

  return (
    <View style={{}}>
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
      {props.inputLabel && (
        <Text style={styles.lblTitleInput}>{props.inputLabel}</Text>
      )}

      <View
        style={[
          styles.container,
          multiline && styles.multilineContainer,
          multiline && {
            paddingVertical: getWidth(8),
          },
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <View style={styles.vwTextInputAndIcon}>
          {props.leftIcon && (
            <Image source={props.fieldIcon} style={styles.imgLeftIcon}></Image>
          )}
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            style={styles.vwCountryCode}
            activeOpacity={activityOpacity}
          >
            <Text style={styles.lblCountryCode}>+{props.callingCode}</Text>
            {/* <Image
              source={images.imgLeftArrow}
              style={{
                transform: [{ rotate: '270deg' }],
                tintColor: Colors.gray0F,
                marginTop: 2,
              }}
            ></Image>*/}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardAppearance="dark"
            selectionColor={Platform.OS === 'ios' ? Colors.blue002 : Colors.blue002_90}
            cursorColor={Colors.blue002}
            returnKeyType={focusnext ? 'next' : 'default'}
            keyboardType="phone-pad"
            blurOnSubmit={blur ? true : false}
            ref={inputRef}
            onSubmitEditing={focusnext}
            value={value}
            placeholder={props.placHolderLabel}
            placeholderTextColor={Colors.gray75}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[styles.input, {}]}
            {...props}
          />
        </View>
      </View>
      {/* Error Message */}
      {displayError && (
        <View style={styles.vwError}>
          <Image source={images.imgWarning} />
          <Text style={styles.lablWarning}>{displayError}</Text>
        </View>
      )}
    </View>
  );
};

export default PrimaryTitleMoblieNumber;
