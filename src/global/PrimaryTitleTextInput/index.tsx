import { Image, Text, TextInput, View } from 'react-native';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';

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
  const inputRef = useRef<TextInput>(null);

 
  useImperativeHandle(refs, () => ({
    focus: () => {
      
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
    if (isFocused) return Colors.blue1C; 
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

  return (
    <View style={{}}>
      {props.inputLabel&&
      <Text style={styles.lblTitleInput}>{props.inputLabel}</Text>}
      <View
        style={[
          styles.container,
          multiline && styles.multilineContainer,
          multiline && {
            paddingVertical: getWidth(16),
          },
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
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

        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            keyboardAppearance="dark"
            selectionColor={Colors.gray75}
            cursorColor={Colors.gray75}
            editable={props.editable}
            keyboardType={props.keyaboardType}
            autoCapitalize={props.autoCapitalize ? 'none' : 'sentences'}
            maxLength={props.maxlength}
            returnKeyType={focusnext ? 'next' : 'default'}
            blurOnSubmit={blur ? true : false}
            onSubmitEditing={focusnext}
            scrollEnabled={multiline}
            value={value}
            placeholder={props.placHolderLabel}
            placeholderTextColor={Colors.gray75}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              {
                
              },
            ]}
            multiline={multiline}
            numberOfLines={multiline ? 0 : 4}
            secureTextEntry={isPassword && !isPasswordVisible}
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

export default PrimaryTitleTextInput;
