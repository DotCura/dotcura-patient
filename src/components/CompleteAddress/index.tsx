import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../constants/Styles';
import TopBar from '../../global/TopBar/TopBar';
import TitleSubtitle from '../../global/TitleSubtitle';
import { styles } from './styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import CustomButton from '../../global/Buttons';
import { getHeight } from '../../constants/utils/Dimensions';

const CompleteAddressComponent = (props: any) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[constnatStyles.keyboardContainer]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {/* TopBar */}
        <TopBar
          array={props.headerArray}
          currentIndex={1}
          // onClickBack={() => props.navigation.goBack()}
        />

        {/* HeaderView */}
        <View style={styles.vwHeader}>
          <TitleSubtitle
            title={getTranslation('completeaddresstitle')}
            subtitle={getTranslation('completeaddressssubtitle')}
          />
        </View>

        <View style={styles.vwInputsMain}>
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('typeplaceholder')}
            refs={props.cardNumberRef}
            focusnext={() => props.expiryDateRef.current?.focus()}
            inputLabel={getTranslation('type')}
            blur={false}
            leftIcon={false}
            keyaboardType={'number-pad'}
            value={props.cardNumber}
            onChangeFun={(text: any) =>
              props.handleOnChangeText(text, 'cardNumber')
            }
            errorMessage={props.cardNumberError}
            setErrorMessage={props.setCardNumberError}
            maxlength={19}
            isMultiline={false}
            isBorder={false}
          />

          <View style={styles.vwInputsInner}>
            <PrimaryTitleTextInput
              flex={1}
              placHolderLabel={getTranslation('florrplaceholder')}
              refs={props.expiryDateRef}
              focusnext={() => props.cvvRef.current?.focus()}
              inputLabel={getTranslation('florr')}
              blur={false}
              leftIcon={false}
              keyaboardType={'number-pad'}
              value={props.expiryDate}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'expiryDate')
              }
              errorMessage={props.expiryDateError}
              setErrorMessage={props.setExpiryDateError}
              maxlength={5}
              isMultiline={false}
              isBorder={false}
              isflexstart={true}
            />
            <PrimaryTitleTextInput
              flex={1}
              placHolderLabel={getTranslation('stairsplaceholder')}
              inputLabel={getTranslation('stairs')}
              refs={props.cvvRef}
              focusnext={() => props.cardHolderNameRef.current?.focus()}
              blur={false}
              leftIcon={false}
              keyaboardType={'number-pad'}
              value={props.cvv}
              onChangeFun={(text: any) => props.handleOnChangeText(text, 'cvv')}
              errorMessage={props.cvvError}
              setErrorMessage={props.setCvvError}
              maxlength={3}
              isflexstart={true}
              isMultiline={false}
              isBorder={false}
            />
          </View>

          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('instructionplaceholder')}
            refs={props.cardHolderNameRef}
            inputLabel={getTranslation('instruction')}
            blur={true}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.cardHolderName}
            onChangeFun={(text: any) =>
              props.handleOnChangeText(text, 'cardHolderName')
            }
            errorMessage={props.cardHolderNameError}
            setErrorMessage={props.setCardHolderNameError}
            maxlength={200}
            isMultiline={false}
            isBorder={false}
          />
        </View>
      </View>

      {/* vwBottomBtn */}
      <View
        style={[
          styles.vwBottom,
          { marginBottom: props.insets.bottom + getHeight(16) },
        ]}
      >
        <CustomButton
          btnPress={props.handleOnPressAddCard}
          btnTitle={getTranslation('continue')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CompleteAddressComponent;
